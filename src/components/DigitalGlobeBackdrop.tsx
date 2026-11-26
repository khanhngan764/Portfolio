import { useEffect, useRef } from 'react';

interface SurfacePoint {
  x: number;
  y: number;
  z: number;
  size: number;
  isHub: boolean;
  phase: number;
}

interface DataArc {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
  lift: number;
}

interface AmbientParticle {
  xRatio: number;
  yRatio: number;
  radius: number;
  alpha: number;
  driftX: number;
  driftY: number;
  phase: number;
}

const AXIAL_TILT = 0.24; // ~14 deg tilt
const COS_TILT = Math.cos(AXIAL_TILT);
const SIN_TILT = Math.sin(AXIAL_TILT);

function buildSphereNodes(count: number): SurfacePoint[] {
  const points: SurfacePoint[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;

    // Emphasize hub nodes along mid-latitudes for a rich connected-world feel
    const isHub = i % 9 === 0 && Math.abs(y) < 0.82;
    points.push({
      x,
      y,
      z,
      size: isHub ? 2.6 : 1.1 + ((i * 7) % 10) * 0.1,
      isHub,
      phase: (i * 0.61) % (Math.PI * 2),
    });
  }
  return points;
}

function buildDataArcs(points: SurfacePoint[]): DataArc[] {
  const hubIndices = points
    .map((p, idx) => (p.isHub ? idx : -1))
    .filter((idx) => idx !== -1);

  const arcs: DataArc[] = [];
  const count = Math.min(12, Math.floor(hubIndices.length / 2));
  for (let i = 0; i < count; i++) {
    const fromIdx = hubIndices[(i * 3) % hubIndices.length];
    const toIdx = hubIndices[(i * 3 + 5) % hubIndices.length];
    if (fromIdx === toIdx) continue;
    arcs.push({
      fromIdx,
      toIdx,
      progress: (i * 0.19) % 1,
      speed: 0.0028 + (i % 4) * 0.0007,
      lift: 1.18 + (i % 3) * 0.08,
    });
  }
  return arcs;
}

function buildAmbientParticles(count: number): AmbientParticle[] {
  const particles: AmbientParticle[] = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      xRatio: ((i * 37) % 100) / 100,
      yRatio: ((i * 53 + 17) % 100) / 100,
      radius: 0.8 + (i % 3) * 0.65,
      alpha: 0.16 + (i % 5) * 0.08,
      driftX: ((i % 2 === 0 ? 1 : -1) * (0.00008 + (i % 4) * 0.00003)),
      driftY: -0.00007 - (i % 3) * 0.00003,
      phase: i * 0.8,
    });
  }
  return particles;
}

export function DigitalGlobeBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const points = buildSphereNodes(210);
    const arcs = buildDataArcs(points);
    const ambient = buildAmbientParticles(38);

    // Precompute neighbor pairs for surface mesh lines (only short chords)
    const meshLinks: [number, number][] = [];
    for (let i = 0; i < points.length; i++) {
      let linked = 0;
      for (let j = i + 1; j < points.length && linked < 2; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const dz = points[i].z - points[j].z;
        const distSq = dx * dx + dy * dy + dz * dz;
        if (distSq < 0.13) {
          meshLinks.push([i, j]);
          linked++;
        }
      }
    }

    let width = 0;
    let height = 0;
    let dpr = 1;
    let rafId = 0;
    let isVisible = true;
    let angle = 0.4;
    let tick = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const project = (nx: number, ny: number, nz: number, rot: number, cx: number, cy: number, radius: number) => {
      const cosY = Math.cos(rot);
      const sinY = Math.sin(rot);
      // Rotate around Y axis
      const rx = nx * cosY + nz * sinY;
      const rz = -nx * sinY + nz * cosY;
      // Apply subtle axial tilt around X axis
      const ty = ny * COS_TILT - rz * SIN_TILT;
      const tz = ny * SIN_TILT + rz * COS_TILT;
      const perspective = 2.6 / (2.6 - tz * 0.65);
      return {
        x: cx + rx * radius * perspective,
        y: cy + ty * radius * perspective,
        z: tz,
        scale: perspective,
      };
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);

      // Position globe between headline & portrait on desktop, centered softly on mobile
      const isCompact = width < 768;
      const cx = isCompact ? width * 0.52 : width * 0.55;
      const cy = isCompact ? height * 0.48 : height * 0.56;
      const radius = isCompact
        ? Math.min(width, height) * 0.42
        : Math.min(width * 0.25, height * 0.56);

      // 1. Subtle digital grid & tech circuit accents on left/right margins
      ctx.save();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
      ctx.lineWidth = 1;
      const gridStep = 56;
      for (let gx = (width % gridStep) / 2; gx < width; gx += gridStep) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, height);
        ctx.stroke();
      }
      for (let gy = (height % gridStep) / 2; gy < height; gy += gridStep) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(width, gy);
        ctx.stroke();
      }

      // 2. Left & right stylized data-center rack silhouettes
      ctx.fillStyle = 'rgba(4, 21, 56, 0.55)';
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.16)';
      const racks = [
        { x: 18, y: 26, w: 68, h: height - 60 },
        { x: 96, y: 52, w: 54, h: height - 104 },
        { x: width - 150, y: 48, w: 56, h: height - 100 },
        { x: width - 84, y: 24, w: 66, h: height - 56 },
      ];
      if (!isCompact) {
        for (const r of racks) {
          ctx.fillRect(r.x, r.y, r.w, r.h);
          ctx.strokeRect(r.x, r.y, r.w, r.h);
          for (let ly = r.y + 18; ly < r.y + r.h - 14; ly += 22) {
            const pulse = 0.25 + 0.35 * Math.sin(tick * 0.03 + ly * 0.1 + r.x);
            ctx.fillStyle = `rgba(34, 211, 238, ${pulse.toFixed(2)})`;
            ctx.fillRect(r.x + 10, ly, r.w - 20, 2);
          }
          ctx.fillStyle = 'rgba(4, 21, 56, 0.55)';
        }
      }
      ctx.restore();

      // 3. Ambient floating digital particles
      for (const p of ambient) {
        if (!prefersReduced) {
          p.xRatio = (p.xRatio + p.driftX + 1) % 1;
          p.yRatio = (p.yRatio + p.driftY + 1) % 1;
        }
        const px = p.xRatio * width;
        const py = p.yRatio * height;
        const twinkle = 0.65 + 0.35 * Math.sin(tick * 0.04 + p.phase);
        ctx.beginPath();
        ctx.arc(px, py, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(125, 211, 252, ${(p.alpha * twinkle).toFixed(2)})`;
        ctx.fill();
      }

      // 4. Radial atmospheric halo behind globe
      const halo = ctx.createRadialGradient(cx, cy, radius * 0.15, cx, cy, radius * 1.55);
      halo.addColorStop(0, 'rgba(34, 211, 238, 0.28)');
      halo.addColorStop(0.55, 'rgba(37, 99, 235, 0.14)');
      halo.addColorStop(1, 'rgba(4, 18, 48, 0)');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.55, 0, Math.PI * 2);
      ctx.fill();

      // 5. Outer rotating orbital rings around the globe
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-0.22);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.24)';
      ctx.lineWidth = 1.1;
      ctx.setLineDash([6, 8]);
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 1.24, radius * 0.42, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Orbiting satellite beacon on ring 1
      const sat1Angle = angle * 1.35;
      const sat1X = Math.cos(sat1Angle) * radius * 1.24;
      const sat1Y = Math.sin(sat1Angle) * radius * 0.42;
      ctx.setLineDash([]);
      ctx.fillStyle = '#22D3EE';
      ctx.beginPath();
      ctx.arc(sat1X, sat1Y, 3.2, 0, Math.PI * 2);
      ctx.fill();

      // Second orbital ring
      ctx.rotate(0.48);
      ctx.strokeStyle = 'rgba(125, 211, 252, 0.16)';
      ctx.setLineDash([3, 7]);
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 1.15, radius * 0.34, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // 6. Wireframe parallels & meridians on sphere
      ctx.save();
      // Outer sphere boundary rim
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(125, 211, 252, 0.35)';
      ctx.lineWidth = 1.25;
      ctx.stroke();

      // Parallels (latitude rings)
      const latitudes = [-0.66, -0.34, 0, 0.34, 0.66];
      for (const lat of latitudes) {
        const latR = Math.sqrt(1 - lat * lat);
        ctx.beginPath();
        for (let s = 0; s <= 48; s++) {
          const phi = (s / 48) * Math.PI * 2;
          const pt = project(
            Math.cos(phi) * latR,
            lat,
            Math.sin(phi) * latR,
            angle,
            cx,
            cy,
            radius
          );
          if (s === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = lat === 0 ? 'rgba(34, 211, 238, 0.28)' : 'rgba(125, 211, 252, 0.13)';
        ctx.lineWidth = lat === 0 ? 1.1 : 0.8;
        ctx.stroke();
      }

      // Meridians (longitude rings)
      const meridians = 6;
      for (let m = 0; m < meridians; m++) {
        const lonOffset = (m / meridians) * Math.PI;
        ctx.beginPath();
        for (let s = 0; s <= 48; s++) {
          const phi = (s / 48) * Math.PI * 2;
          const pt = project(
            Math.cos(phi) * Math.cos(lonOffset),
            Math.sin(phi),
            Math.cos(phi) * Math.sin(lonOffset),
            angle,
            cx,
            cy,
            radius
          );
          if (s === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = 'rgba(125, 211, 252, 0.14)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
      ctx.restore();

      // 7. Project all surface nodes
      const projected = points.map((p) => ({
        ...project(p.x, p.y, p.z, angle, cx, cy, radius),
        meta: p,
      }));

      // 8. Surface mesh links (front hemisphere brighter)
      ctx.lineWidth = 0.75;
      for (const [i, j] of meshLinks) {
        const a = projected[i];
        const b = projected[j];
        if (a.z < -0.2 && b.z < -0.2) continue;
        const depthAlpha = Math.max(0.05, ((a.z + b.z) * 0.5 + 1) * 0.16);
        ctx.strokeStyle = `rgba(125, 211, 252, ${depthAlpha.toFixed(2)})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // 9. Animated Digital Transformation Data Arcs & Moving Packets
      for (const arc of arcs) {
        const from = points[arc.fromIdx];
        const to = points[arc.toIdx];
        if (!prefersReduced) {
          arc.progress = (arc.progress + arc.speed) % 1;
        }

        const pFrom = projected[arc.fromIdx];
        const pTo = projected[arc.toIdx];
        if (pFrom.z < -0.35 && pTo.z < -0.35) continue;

        // Midpoint elevated radially outward
        const mx = (from.x + to.x) * 0.5 * arc.lift;
        const my = (from.y + to.y) * 0.5 * arc.lift;
        const mz = (from.z + to.z) * 0.5 * arc.lift;
        const pMid = project(mx, my, mz, angle, cx, cy, radius);

        const visibility = Math.max(0.12, ((pFrom.z + pTo.z) * 0.5 + 1) * 0.28);
        ctx.strokeStyle = `rgba(34, 211, 238, ${visibility.toFixed(2)})`;
        ctx.lineWidth = 1.15;
        ctx.beginPath();
        ctx.moveTo(pFrom.x, pFrom.y);
        ctx.quadraticCurveTo(pMid.x, pMid.y, pTo.x, pTo.y);
        ctx.stroke();

        // Traveling glowing packet along quadratic curve
        const t = arc.progress;
        const inv = 1 - t;
        const bx = inv * inv * pFrom.x + 2 * inv * t * pMid.x + t * t * pTo.x;
        const by = inv * inv * pFrom.y + 2 * inv * t * pMid.y + t * t * pTo.y;

        ctx.beginPath();
        ctx.arc(bx, by, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(bx, by, 5.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34, 211, 238, 0.35)';
        ctx.fill();
      }

      // 10. Draw nodes sorted back-to-front
      const sortedIndices = projected
        .map((_, idx) => idx)
        .sort((a, b) => projected[a].z - projected[b].z);

      for (const idx of sortedIndices) {
        const pt = projected[idx];
        const frontFactor = (pt.z + 1) * 0.5; // 0 (back) -> 1 (front)
        const alpha = 0.14 + frontFactor * 0.78;
        const r = pt.meta.size * (0.7 + frontFactor * 0.45);

        if (pt.meta.isHub && pt.z > -0.15) {
          const pulse = 1 + 0.45 * Math.sin(tick * 0.06 + pt.meta.phase);
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, r * 2.1 * pulse, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(34, 211, 238, ${(alpha * 0.22).toFixed(2)})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2);
        ctx.fillStyle = pt.meta.isHub
          ? `rgba(224, 242, 254, ${alpha.toFixed(2)})`
          : `rgba(125, 211, 252, ${alpha.toFixed(2)})`;
        ctx.fill();
      }

      // 11. Subtle circuit data bus along bottom
      ctx.save();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.moveTo(0, height * 0.85);
      ctx.lineTo(width * 0.25, height * 0.85);
      ctx.lineTo(width * 0.28, height * 0.76);
      ctx.lineTo(width * 0.4, height * 0.76);
      ctx.moveTo(width * 0.72, height * 0.22);
      ctx.lineTo(width * 0.82, height * 0.22);
      ctx.lineTo(width * 0.85, height * 0.31);
      ctx.lineTo(width, height * 0.31);
      ctx.stroke();
      ctx.restore();
    };

    const animate = () => {
      if (isVisible && !prefersReduced) {
        angle += 0.0024;
        tick += 1;
        drawFrame();
        rafId = requestAnimationFrame(animate);
      }
    };

    resize();
    drawFrame();

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = Boolean(entry?.isIntersecting);
        cancelAnimationFrame(rafId);
        if (isVisible && !prefersReduced) {
          rafId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const resizeObserver = new ResizeObserver(() => {
      resize();
      drawFrame();
    });
    resizeObserver.observe(canvas);

    if (!prefersReduced) {
      rafId = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="w-full h-full block"
    />
  );
}

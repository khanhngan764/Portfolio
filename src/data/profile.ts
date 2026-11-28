export type Language = 'vi' | 'en';

export type SkillColorTheme = 'blue' | 'rose' | 'emerald' | 'indigo' | 'cyan' | 'amber';

export interface SkillPillar {
  label: string;
  stack: string;
  detail: string;
}

export interface CompetencyCard {
  id: string;
  index: string;
  title: string;
  shortSubtitle: string;
  theme: SkillColorTheme;
  iconKey: 'server' | 'database' | 'shield' | 'code' | 'map' | 'users';
  items: string[];
  pillars?: SkillPillar[];
}

export interface ProjectItem {
  id: string;
  title: string;
  shortTitle: string;
  category: string;
  subtitle: string;
  year: string;
  platform: string;
  role: string;
  visualType:
    | 'archive-system'
    | 'oracle-dataguard'
    | 'arcgis-enterprise'
    | 'mobile-app'
    | 'command-operations';
  summary: string;
  scope: string[];
  impact: string;
  deliverables: string[];
}

export interface ExperienceItem {
  id: string;
  period: string;
  duration: string;
  role: string;
  organization: string;
  location: string;
  summary: string;
  highlights: string[];
}

export interface LocalizedContent {
  pageTitle: string;
  nav: {
    home: string;
    homeSub: string;
    about: string;
    aboutSub: string;
    skills: string;
    skillsSub: string;
    projects: string;
    projectsSub: string;
    experience: string;
    experienceSub: string;
    education: string;
    educationSub: string;
    contact: string;
    contactSub: string;
  };
  hero: {
    greeting: string;
    introPrefix: string;
    fullName: string;
    roleTitle: string;
    pillars: string[];
    lead: string;
    downloadCv: string;
    contactMe: string;
    quoteTop: string;
    quoteBottom: string;
    portraitCaption: string;
  };
  highlights: {
    id: string;
    title: string;
    subtitle: string;
    iconType: 'trophy' | 'grad' | 'oracle' | 'windows' | 'arcgis' | 'shield';
  }[];
  about: {
    headingVi: string;
    headingEn: string;
    summary: string;
    values: string[];
    moreBtn: string;
  };
  skillsSection: {
    headingVi: string;
    headingEn: string;
    clickHint: string;
  };
  projectsSection: {
    headingVi: string;
    headingEn: string;
    viewAll: string;
    viewDetails: string;
  };
  experienceSection: {
    headingVi: string;
    headingEn: string;
    viewDetails: string;
  };
  educationSection: {
    headingVi: string;
    headingEn: string;
    degree: string;
    school: string;
    details: string[];
  };
  contactSection: {
    headingVi: string;
    headingEn: string;
    phoneLabel: string;
    emailLabel: string;
    addressLabel: string;
    addressValue: string;
    qrCaption: string;
    sendMsgBtn: string;
    copied: string;
  };
  footer: {
    tagline: string;
    copyright: string;
  };
  profile: {
    brandName: string;
    fullName: string;
    title: string;
    targetRole: string;
    location: string;
    email: string;
    phone: string;
    phoneDisplay: string;
    zaloUrl: string;
    portraitImage: string;
    cvPdfUrl: string;
    heroLead: string;
    education: { period: string; degree: string; school: string }[];
  };
  competencies: CompetencyCard[];
  projects: ProjectItem[];
  experiences: ExperienceItem[];
  techStackTable: { group: string; technologies: string }[];
  projectModal: {
    closeLabel: string;
    roleHeading: string;
    techHeading: string;
    impactHeading: string;
    scopeHeading: string;
    footerPrompt: string;
    contactBtn: string;
    prevProject: string;
    nextProject: string;
  };
  cvModal: {
    headerTitle: string;
    downloadOriginalPdf: string;
    printBtn: string;
    closeLabel: string;
    summaryHeading: string;
    experienceHeading: string;
    projectsHeading: string;
    educationHeading: string;
    techStackHeading: string;
  };
  contactModal: {
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    requiredError: string;
    emailError: string;
    submitBtn: string;
    successTitle: string;
    successDesc: string;
    openMailBtn: string;
    copyContentBtn: string;
    copiedContentBtn: string;
    zaloFallbackBtn: string;
    closeBtn: string;
  };
}

const COMMON = {
  email: 'thien_hv@yahoo.com',
  phone: '0948820369',
  phoneDisplay: '0948 820 369',
  zaloUrl: 'https://zalo.me/0948820369',
  portraitImage: '/assets/aistudio/anhthe_af671091.jpg',
  cvPdfUrl: '/cv/CV_Hoang_Van_Thien_IT_Supervisor.pdf',
};

export const CONTENT: Record<Language, LocalizedContent> = {
  vi: {
    pageTitle: 'Hoàng Văn Thiện — IT Supervisor Portfolio',
    nav: {
      home: 'Trang chủ',
      homeSub: 'Home',
      about: 'Giới thiệu',
      aboutSub: 'About Me',
      skills: 'Kỹ năng',
      skillsSub: 'Skills',
      projects: 'Dự án',
      projectsSub: 'Projects',
      experience: 'Kinh nghiệm',
      experienceSub: 'Experience',
      education: 'Học vấn',
      educationSub: 'Education',
      contact: 'Liên hệ',
      contactSub: 'Contact',
    },
    hero: {
      greeting: 'Xin chào!',
      introPrefix: 'Tôi là Hoàng Văn Thiện',
      fullName: 'HOÀNG VĂN THIỆN',
      roleTitle: 'IT SUPERVISOR',
      pillars: ['IT Infrastructure', 'Database Administration', 'Enterprise Systems'],
      lead: 'Với 16 năm kinh nghiệm trong lĩnh vực CNTT, tôi luôn nỗ lực mang đến các giải pháp công nghệ hiệu quả, an toàn và bền vững cho doanh nghiệp.',
      downloadCv: 'Tải CV (PDF)',
      contactMe: 'Liên hệ với tôi',
      quoteTop: 'Công nghệ',
      quoteBottom: 'vì Tương lai Tốt đẹp hơn',
      portraitCaption: 'Thạc sĩ CNTT · 16 năm kinh nghiệm',
    },
    highlights: [
      {
        id: 'h-exp',
        title: '16+',
        subtitle: 'Năm kinh nghiệm (Years of Experience)',
        iconType: 'trophy',
      },
      {
        id: 'h-edu',
        title: 'Thạc sĩ CNTT',
        subtitle: 'Master of IT',
        iconType: 'grad',
      },
      {
        id: 'h-oracle',
        title: 'Oracle 19c / 21c',
        subtitle: '& Data Guard',
        iconType: 'oracle',
      },
      {
        id: 'h-win',
        title: 'Windows Server',
        subtitle: 'Active Directory',
        iconType: 'windows',
      },
      {
        id: 'h-gis',
        title: 'ArcGIS',
        subtitle: 'Enterprise',
        iconType: 'arcgis',
      },
      {
        id: 'h-sec',
        title: 'An toàn thông tin',
        subtitle: '(Information Security)',
        iconType: 'shield',
      },
    ],
    about: {
      headingVi: 'Về tôi',
      headingEn: 'About Me',
      summary:
        'Thạc sĩ Công nghệ thông tin với 16 năm kinh nghiệm trong quản trị hạ tầng mạng, máy chủ, cơ sở dữ liệu và phát triển phần mềm. Tôi có khả năng quản lý, triển khai và tối ưu các hệ thống CNTT quy mô lớn, đảm bảo hoạt động ổn định, an toàn và hiệu quả.',
      values: [
        'Kỷ luật, trách nhiệm',
        'Tư duy hệ thống',
        'Giải pháp sáng tạo',
        'Luôn hướng tới chất lượng',
      ],
      moreBtn: 'Chi tiết hơn',
    },
    skillsSection: {
      headingVi: 'Năng lực chuyên môn',
      headingEn: 'Core Skills',
      clickHint: 'Nhấn vào từng nhóm kỹ năng để xem chi tiết',
    },
    projectsSection: {
      headingVi: 'Dự án tiêu biểu',
      headingEn: 'Featured Projects',
      viewAll: 'Xem tất cả',
      viewDetails: 'Xem chi tiết',
    },
    experienceSection: {
      headingVi: 'Kinh nghiệm làm việc',
      headingEn: 'Work Experience',
      viewDetails: 'Xem chi tiết',
    },
    educationSection: {
      headingVi: 'Trình độ học vấn',
      headingEn: 'Education',
      degree: 'Thạc sĩ Công nghệ thông tin',
      school: 'Trường Đại học Lạc Hồng',
      details: [
        'Chuyên ngành: Công nghệ Thông tin',
        'Bằng Chuyên viên Công nghệ Phần mềm',
        'Chứng chỉ Tiếng Anh B1',
      ],
    },
    contactSection: {
      headingVi: 'Thông tin liên hệ',
      headingEn: 'Contact',
      phoneLabel: 'Điện thoại:',
      emailLabel: 'Email:',
      addressLabel: 'Địa chỉ:',
      addressValue: 'Đồng Nai, Việt Nam',
      qrCaption: 'Quét QR kết nối Zalo',
      sendMsgBtn: 'Gửi tin nhắn trực tiếp',
      copied: 'Đã sao chép',
    },
    footer: {
      tagline: 'Công nghệ kiến tạo giá trị – Cùng doanh nghiệp vươn tới tương lai',
      copyright: '© 2026 Hoàng Văn Thiện. All rights reserved.',
    },
    profile: {
      brandName: 'HOÀNG VĂN THIỆN',
      fullName: 'Hoàng Văn Thiện',
      title: 'IT Supervisor | IT Infrastructure & Database Management',
      targetRole: 'Vị trí ứng tuyển: Trưởng Bộ phận Công nghệ Thông tin (IT Supervisor)',
      location: 'Phường Trảng Dài, TP. Đồng Nai, Việt Nam',
      ...COMMON,
      heroLead:
        'Thạc sĩ Công nghệ thông tin với 16 năm kinh nghiệm trong lĩnh vực quản trị hạ tầng công nghệ thông tin, hệ thống máy chủ, cơ sở dữ liệu doanh nghiệp (Oracle 19c/21c, Data Guard, SQL Server), ArcGIS Enterprise và phát triển phần mềm nội bộ C# .NET.',
      education: [
        {
          period: 'Thạc sĩ CNTT',
          degree: 'Thạc sĩ Công nghệ thông tin (Master of Information Technology)',
          school: 'Trường Đại học Lạc Hồng',
        },
        {
          period: 'Chuyên môn bổ trợ',
          degree: 'Chuyên viên Công nghệ Phần mềm',
          school: 'Phân tích, thiết kế và phát triển phần mềm ứng dụng',
        },
        {
          period: 'Ngoại ngữ',
          degree: 'Chứng chỉ Tiếng Anh B1',
          school: 'Khung năng lực ngoại ngữ bậc 3 (CEFR B1)',
        },
      ],
    },
    competencies: [
      {
        id: 'comp-infra',
        index: '01.',
        title: 'Quản trị Hạ tầng CNTT',
        shortSubtitle: '(Network & Server)',
        theme: 'blue',
        iconKey: 'server',
        items: [
          'Quản trị và vận hành hạ tầng mạng LAN/WAN, Internet và hệ thống kết nối.',
          'Quản trị Windows Server, Active Directory và các dịch vụ hệ thống.',
          'Quản lý tài nguyên máy chủ, thiết bị CNTT và hệ thống người dùng.',
          'Giám sát hiệu năng, bảo trì và xử lý dứt điểm sự cố hạ tầng.',
        ],
      },
      {
        id: 'comp-db',
        index: '02.',
        title: 'Quản trị CSDL',
        shortSubtitle: '(Oracle, SQL Server)',
        theme: 'rose',
        iconKey: 'database',
        items: [
          'Quản trị, vận hành và tối ưu Oracle Database 19c/21c & Microsoft SQL Server.',
          'Triển khai, giám sát đồng bộ kiến trúc Oracle Data Guard Primary/Standby.',
          'Thực hiện sao lưu, phục hồi dữ liệu (Backup & Recovery) định kỳ.',
          'Quản lý và kiểm soát chặt chẽ quyền truy cập, tính toàn vẹn dữ liệu.',
        ],
      },
      {
        id: 'comp-sec',
        index: '03.',
        title: 'An toàn thông tin',
        shortSubtitle: '(Security)',
        theme: 'emerald',
        iconKey: 'shield',
        items: [
          'Xây dựng phương án sao lưu và phục hồi dữ liệu đảm bảo Business Continuity.',
          'Kiểm soát phân quyền truy cập và bảo vệ tài nguyên hệ thống nội bộ.',
          'Giám sát, phát hiện và xử lý kịp thời các sự cố an toàn thông tin.',
          'Đề xuất giải pháp dự phòng, giảm thiểu tối đa thời gian gián đoạn dịch vụ.',
        ],
      },
      {
        id: 'comp-dev',
        index: '04.',
        title: 'Phát triển phần mềm',
        shortSubtitle: '(C# .NET, ReactJS, API)',
        theme: 'indigo',
        iconKey: 'code',
        pillars: [
          {
            label: 'Thiết kế Database',
            stack: 'Oracle 19c/21c · SQL Server · ERD & Indexing',
            detail:
              'Thiết kế lược đồ quan hệ chuẩn hóa, tối ưu truy vấn SQL/PL-SQL, đánh chỉ mục hiệu năng cao và đảm bảo tính toàn vẹn dữ liệu doanh nghiệp.',
          },
          {
            label: 'Frontend Hiện đại',
            stack: 'ReactJS · TypeScript · Tailwind CSS · Responsive UI/UX',
            detail:
              'Phát triển giao diện SPA theo kiến trúc Component tái sử dụng, tối ưu trải nghiệm người dùng (UI/UX) và tương thích mượt mà trên cả Web lẫn Mobile.',
          },
          {
            label: 'Backend RESTful API',
            stack: 'C# .NET / ASP.NET Core · Node.js · JWT & OpenAPI',
            detail:
              'Xây dựng hệ thống RESTful API theo kiến trúc phân lớp hiện đại, chuẩn hóa endpoint JSON, xác thực phân quyền bảo mật (JWT/RBAC) và xử lý bất đồng bộ hiệu năng cao.',
          },
        ],
        items: [
          'Thiết kế Database: Mô hình hóa dữ liệu quan hệ (ERD), chuẩn hóa lược đồ trên Oracle Database & SQL Server, tối ưu hóa truy vấn và Stored Procedure.',
          'Frontend hiện đại: Xây dựng ứng dụng Web SPA với ReactJS, TypeScript, kiến trúc Component và giao diện responsive chuẩn UX/UI.',
          'Backend RESTful API: Phát triển API chuẩn REST với C# .NET / ASP.NET Core & Node.js, tích hợp bảo mật JWT, phân quyền RBAC và tài liệu hóa OpenAPI.',
          'Kiến trúc đồng bộ: Kết nối liền mạch Web, Mobile App và CSDL lõi giúp số hóa và tự động hóa quy trình nghiệp vụ đơn vị.',
        ],
      },
      {
        id: 'comp-gis',
        index: '05.',
        title: 'GIS Enterprise',
        shortSubtitle: '(ArcGIS)',
        theme: 'cyan',
        iconKey: 'map',
        items: [
          'Quản trị, triển khai và vận hành đồng bộ hệ thống ArcGIS Enterprise.',
          'Quản trị các thành phần ArcGIS Server và ArcGIS Portal.',
          'Hỗ trợ vận hành hệ thống dữ liệu không gian và ứng dụng GIS chuyên ngành.',
          'Phối hợp xử lý sự cố và tối ưu hiệu năng truy vấn hệ thống GIS.',
        ],
      },
      {
        id: 'comp-lead',
        index: '06.',
        title: 'Quản lý đội ngũ',
        shortSubtitle: '(Team Leadership)',
        theme: 'amber',
        iconKey: 'users',
        items: [
          'Lập kế hoạch vận hành, bảo trì và nâng cấp tổng thể hạ tầng CNTT.',
          'Phân công, điều phối và theo dõi tiến độ công việc kỹ thuật.',
          'Giám sát chất lượng xử lý sự cố và nâng cao chất lượng hỗ trợ người dùng.',
          'Phối hợp các phòng ban, nhà cung cấp dịch vụ & tối ưu chi phí CNTT.',
        ],
      },
    ],
    projects: [
      {
        id: 'proj-archive-system',
        title: 'Hệ thống phần mềm quản lý kho lưu trữ hồ sơ',
        shortTitle: 'Hệ thống quản lý kho lưu trữ hồ sơ',
        category: 'Phần mềm & CSDL',
        subtitle: 'C# .NET + Oracle',
        year: 'Số hóa nghiệp vụ',
        platform: 'C# .NET · Oracle Database',
        role: 'Phân tích, thiết kế và trực tiếp phát triển',
        visualType: 'archive-system',
        summary:
          'Trực tiếp khảo sát nghiệp vụ, thiết kế cấu trúc cơ sở dữ liệu Oracle và phát triển ứng dụng quản lý kho lưu trữ hồ sơ bằng C# .NET, giúp số hóa toàn bộ quy trình tra cứu và theo dõi hồ sơ.',
        scope: [
          'Khảo sát và phân tích chi tiết quy trình nghiệp vụ quản lý kho lưu trữ.',
          'Thiết kế cấu trúc cơ sở dữ liệu quan hệ trên nền tảng Oracle Database.',
          'Xây dựng ứng dụng quản lý bằng C# .NET với đầy đủ chức năng nhập kho, tra cứu, mượn trả và theo dõi hồ sơ.',
          'Chuẩn hóa quy trình xử lý thông tin và kiểm soát dữ liệu đầu vào.',
        ],
        impact:
          'Số hóa hoạt động quản lý kho lưu trữ, giảm thao tác thủ công, nâng cao hiệu quả khai thác thông tin và tiết kiệm chi phí vận hành.',
        deliverables: ['Phân tích nghiệp vụ', 'Thiết kế CSDL Oracle', 'Ứng dụng C# .NET', 'Chuẩn hóa quy trình'],
      },
      {
        id: 'proj-oracle-dataguard',
        title: 'Quản trị cơ sở dữ liệu Oracle 19c/21c & Data Guard',
        shortTitle: 'Quản trị Oracle Data Guard',
        category: 'Hạ tầng & HA',
        subtitle: 'Primary / Standby',
        year: 'Tính sẵn sàng cao',
        platform: 'Oracle Database 19c/21c · Data Guard',
        role: 'Quản trị cơ sở dữ liệu & Kiến trúc dự phòng',
        visualType: 'oracle-dataguard',
        summary:
          'Vận hành hệ thống cơ sở dữ liệu Oracle với kiến trúc dự phòng Primary/Standby Database, đảm bảo đồng bộ dữ liệu thời gian thực, sao lưu an toàn và sẵn sàng chuyển đổi khi có sự cố.',
        scope: [
          'Quản trị, giám sát hiệu năng và phân bổ tài nguyên hệ thống Oracle Database 19c/21c.',
          'Theo dõi trạng thái đồng bộ redo log giữa Primary Database và Standby Database.',
          'Thực hiện công tác sao lưu định kỳ, kiểm thử phục hồi dữ liệu và xử lý sự cố CSDL.',
          'Kiểm soát chặt chẽ quyền truy cập, duy trì tính sẵn sàng và ổn định liên tục.',
        ],
        impact:
          'Xây dựng năng lực vận hành thực tế với kiến trúc CSDL có hệ thống dự phòng, đáp ứng yêu cầu bảo vệ và duy trì tính liên tục của dữ liệu.',
        deliverables: ['Oracle 19c/21c', 'Data Guard Primary/Standby', 'Backup & Recovery', 'Giám sát đồng bộ'],
      },
      {
        id: 'proj-arcgis-enterprise',
        title: 'Triển khai & Vận hành Hệ thống ArcGIS Enterprise',
        shortTitle: 'Triển khai ArcGIS Enterprise',
        category: 'Hệ thống GIS',
        subtitle: 'GIS & Spatial Data',
        year: 'Ứng dụng doanh nghiệp',
        platform: 'ArcGIS Enterprise · Server · Portal',
        role: 'Quản trị hệ thống ứng dụng quy mô lớn',
        visualType: 'arcgis-enterprise',
        summary:
          'Triển khai, quản trị và duy trì ổn định hệ sinh thái ứng dụng GIS chuyên ngành bao gồm ArcGIS Enterprise, ArcGIS Server và ArcGIS Portal tích hợp dữ liệu doanh nghiệp.',
        scope: [
          'Cài đặt, cấu hình và quản trị các thành phần cốt lõi của ArcGIS Enterprise, ArcGIS Server và Portal.',
          'Phối hợp quản trị dữ liệu không gian, phân quyền khai thác dịch vụ bản đồ.',
          'Giám sát tài nguyên máy chủ ứng dụng, xử lý sự cố và tối ưu hiệu năng truy xuất.',
        ],
        impact:
          'Đảm bảo vận hành thông suốt hệ thống ứng dụng doanh nghiệp có nhiều thành phần tích hợp và yêu cầu quản trị dữ liệu chuyên ngành.',
        deliverables: ['ArcGIS Enterprise', 'ArcGIS Server & Portal', 'Quản trị dữ liệu GIS', 'Tối ưu hiệu năng'],
      },
      {
        id: 'proj-mobile-enterprise',
        title: 'Thiết kế & Triển khai Ứng dụng Mobile Doanh nghiệp',
        shortTitle: 'Thiết kế & Triển khai Ứng dụng Mobile',
        category: 'Ứng dụng Mobile',
        subtitle: 'iOS & Android · REST API',
        year: 'Di động & Tích hợp',
        platform: 'Cross-Platform Mobile · RESTful API · Oracle/SQL',
        role: 'Thiết kế UI/UX, Kiến trúc & Triển khai Mobile',
        visualType: 'mobile-app',
        summary:
          'Phân tích nghiệp vụ di động, thiết kế giao diện tối ưu cho người dùng cuối và triển khai ứng dụng trên iOS/Android kết nối bảo mật với cơ sở dữ liệu doanh nghiệp.',
        scope: [
          'Khảo sát quy trình tác nghiệp hiện trường và thiết kế giao diện UI/UX trực quan trên thiết bị di động.',
          'Xây dựng kiến trúc ứng dụng đa nền tảng (iOS & Android) kết nối qua RESTful API với hệ thống Oracle / SQL Server.',
          'Tích hợp xác thực phân quyền bảo mật, thông báo đẩy (Push Notification) và đồng bộ dữ liệu linh hoạt.',
          'Kiểm thử hiệu năng, đóng gói và triển khai phát hành ứng dụng cho cán bộ, nhân sự vận hành.',
        ],
        impact:
          'Mở rộng khả năng tra cứu, báo cáo và xử lý công việc mọi lúc mọi nơi trên điện thoại, nâng cao tốc độ phản hồi nghiệp vụ.',
        deliverables: ['Thiết kế UI/UX Mobile', 'iOS & Android', 'RESTful API & Bảo mật', 'Triển khai vận hành'],
      },
      {
        id: 'proj-command-operations',
        title: 'Ứng dụng Chỉ đạo Điều hành & Vận hành Đơn vị',
        shortTitle: 'Ứng dụng Chỉ đạo Điều hành Đơn vị',
        category: 'Điều hành & Quản trị',
        subtitle: 'Dashboard KPI · Điều phối Tác nghiệp',
        year: 'Chuyển đổi số đơn vị',
        platform: 'Web & Mobile Dashboard · C# .NET · Oracle/SQL',
        role: 'Phân tích nghiệp vụ, Kiến trúc hệ thống & Triển khai vận hành',
        visualType: 'command-operations',
        summary:
          'Xây dựng và triển khai nền tảng chỉ đạo điều hành tập trung phục vụ lãnh đạo và các phòng ban của đơn vị theo dõi tiến độ công việc, chỉ số vận hành KPI, xử lý hồ sơ và điều phối nhiệm vụ theo thời gian thực.',
        scope: [
          'Phân tích quy trình chỉ đạo điều hành, giao việc, báo cáo tiến độ và phê duyệt văn bản nội bộ của đơn vị.',
          'Thiết kế bảng điều khiển tổng hợp (Executive Dashboard) trực quan hóa số liệu hồ sơ, KPI phòng ban và cảnh báo trễ hạn.',
          'Tích hợp luồng phối hợp liên phòng ban, nhắc việc tự động và đồng bộ dữ liệu từ hệ thống nghiệp vụ lõi.',
          'Triển khai vận hành đồng bộ cho ban lãnh đạo, trưởng phòng và chuyên viên theo phân quyền chặt chẽ.',
        ],
        impact:
          'Nâng cao hiệu lực chỉ đạo điều hành, minh bạch hóa tiến độ thực hiện nhiệm vụ toàn đơn vị và rút ngắn thời gian tổng hợp báo cáo.',
        deliverables: ['Executive Dashboard', 'Điều phối nhiệm vụ', 'Theo dõi KPI & SLA', 'Báo cáo điều hành'],
      },
    ],
    experiences: [
      {
        id: 'exp-1',
        period: '2010-2016',
        duration: '(6 năm)',
        role: 'Chuyên viên Hạ tầng Mạng, HelpDesk & Phần mềm',
        organization: 'Văn phòng Đăng ký đất đai – Sở Tài nguyên và Môi trường tỉnh Đồng Nai',
        location: 'Đồng Nai, Việt Nam',
        summary:
          'Phụ trách hỗ trợ kỹ thuật (HelpDesk) toàn hệ thống tỉnh và 11 chi nhánh, vận hành hạ tầng mạng – máy chủ và xây dựng phần mềm nội bộ nền tảng.',
        highlights: [
          'HelpDesk toàn bộ mạng nội bộ cho Văn phòng Đăng ký đất đai tỉnh và 11 Chi nhánh trực thuộc toàn tỉnh Đồng Nai, chuẩn hóa quy trình xử lý sự cố.',
          'Triển khai, bảo trì hạ tầng LAN/WAN, máy chủ Windows Server và hệ thống CSDL SQL Server / Oracle nền tảng.',
          'Phát triển phần mềm nội bộ (C# .NET) phục vụ số hóa nghiệp vụ và hỗ trợ kỹ thuật trực tiếp cho các phòng ban.',
        ],
      },
      {
        id: 'exp-2',
        period: '2016 – 2026',
        duration: '(10 năm)',
        role: 'Phụ trách Hạ tầng CNTT, Cơ sở dữ liệu, GIS & Phần mềm (IT Supervisor)',
        organization: 'Trung tâm Công nghệ Thông tin – Sở Nông nghiệp và Môi trường Thành phố Đồng Nai',
        location: 'Đồng Nai, Việt Nam',
        summary:
          'Điều phối vận hành tổng thể hạ tầng CNTT, cơ sở dữ liệu dự phòng độ sẵn sàng cao, hệ thống ArcGIS Enterprise và quản lý phát triển ứng dụng – nhà cung cấp.',
        highlights: [
          'Quản trị hạ tầng mạng LAN/WAN, Windows Server, cơ sở dữ liệu Oracle 19c/21c (Data Guard) & SQL Server, đảm bảo sao lưu – bảo mật và vận hành liên tục.',
          'Vận hành ổn định hệ thống ArcGIS Enterprise (Server, Portal) và các ứng dụng nghiệp vụ quy mô lớn toàn đơn vị.',
          'Phát triển phần mềm nội bộ (C# .NET, ReactJS, Node.js), lập kế hoạch nâng cấp, điều phối đội ngũ kỹ thuật và làm việc với nhà cung cấp theo SLA.',
        ],
      },
    ],
    techStackTable: [
      { group: 'Database', technologies: 'Oracle Database 19c/21c, Microsoft SQL Server' },
      { group: 'High Availability', technologies: 'Oracle Data Guard, Primary/Standby' },
      { group: 'Server', technologies: 'Windows Server, Active Directory' },
      { group: 'Enterprise GIS', technologies: 'ArcGIS Enterprise, ArcGIS Server, Portal' },
      { group: 'Programming', technologies: 'C# .NET, ReactJS, Node.js' },
      { group: 'Networking', technologies: 'LAN/WAN, TCP/IP' },
      { group: 'Data Protection', technologies: 'Backup, Recovery, Data Security' },
      { group: 'IT Management', technologies: 'System Administration, IT Operations, Technical Coordination' },
    ],
    projectModal: {
      closeLabel: 'Đóng chi tiết dự án',
      roleHeading: 'Vai trò đảm nhận',
      techHeading: 'Công nghệ & Nền tảng',
      impactHeading: 'Giá trị mang lại',
      scopeHeading: 'Phạm vi công việc thực hiện',
      footerPrompt: 'Cần trao đổi thêm về kinh nghiệm triển khai hệ thống này?',
      contactBtn: 'Trao đổi trực tiếp',
      prevProject: 'Dự án trước',
      nextProject: 'Dự án tiếp theo',
    },
    cvModal: {
      headerTitle: 'Hồ sơ năng lực (Curriculum Vitae)',
      downloadOriginalPdf: 'Tải PDF gốc',
      printBtn: 'In trang',
      closeLabel: 'Đóng hồ sơ CV',
      summaryHeading: 'Giới thiệu chuyên môn',
      experienceHeading: 'Kinh nghiệm công tác (2010 – 2026)',
      projectsHeading: 'Dự án tiêu biểu',
      educationHeading: 'Trình độ học vấn',
      techStackHeading: 'Nền tảng công nghệ',
    },
    contactModal: {
      title: 'Gửi tin nhắn liên hệ',
      subtitle: 'Kết nối trực tiếp với Hoàng Văn Thiện cho vị trí IT Supervisor hoặc tư vấn giải pháp CNTT.',
      nameLabel: 'Họ và tên / Doanh nghiệp',
      namePlaceholder: 'Ví dụ: Phòng Nhân sự / Quản lý tuyển dụng',
      emailLabel: 'Địa chỉ Email',
      emailPlaceholder: 'hr@company.vn',
      subjectLabel: 'Chủ đề trao đổi',
      subjectPlaceholder: 'Thư mời phỏng vấn vị trí IT Supervisor',
      messageLabel: 'Nội dung lời nhắn',
      messagePlaceholder: 'Nhập thông tin lịch hẹn phỏng vấn hoặc nội dung cần trao đổi...',
      requiredError: 'Vui lòng nhập đầy đủ họ tên, email và nội dung.',
      emailError: 'Địa chỉ email chưa hợp lệ.',
      submitBtn: 'Soạn Email gửi ngay',
      successTitle: 'Đã chuẩn bị nội dung gửi!',
      successDesc:
        'Trình duyệt đã mở ứng dụng Email với đầy đủ thông tin của bạn. Nếu ứng dụng chưa tự mở, bạn có thể bấm nút bên dưới để mở lại hoặc sao chép nội dung gửi qua Zalo.',
      openMailBtn: 'Mở ứng dụng Email',
      copyContentBtn: 'Sao chép nội dung',
      copiedContentBtn: 'Đã sao chép nội dung',
      zaloFallbackBtn: 'Nhắn qua Zalo',
      closeBtn: 'Đóng cửa sổ',
    },
  },

  en: {
    pageTitle: 'Hoang Van Thien — IT Supervisor Portfolio',
    nav: {
      home: 'Home',
      homeSub: 'Trang chủ',
      about: 'About Me',
      aboutSub: 'Giới thiệu',
      skills: 'Skills',
      skillsSub: 'Kỹ năng',
      projects: 'Projects',
      projectsSub: 'Dự án',
      experience: 'Experience',
      experienceSub: 'Kinh nghiệm',
      education: 'Education',
      educationSub: 'Học vấn',
      contact: 'Contact',
      contactSub: 'Liên hệ',
    },
    hero: {
      greeting: 'Hello!',
      introPrefix: "I'm Hoang Van Thien",
      fullName: 'HOANG VAN THIEN',
      roleTitle: 'IT SUPERVISOR',
      pillars: ['IT Infrastructure', 'Database Administration', 'Enterprise Systems'],
      lead: 'With 16 years of experience in Information Technology, I am dedicated to delivering efficient, secure, and resilient technology solutions for enterprises.',
      downloadCv: 'Download CV (PDF)',
      contactMe: 'Contact Me',
      quoteTop: 'Technology',
      quoteBottom: 'for a Better Future',
      portraitCaption: 'M.Sc. in IT · 16 Years Experience',
    },
    highlights: [
      {
        id: 'h-exp',
        title: '16+',
        subtitle: 'Years of Experience',
        iconType: 'trophy',
      },
      {
        id: 'h-edu',
        title: 'Master of IT',
        subtitle: 'Lac Hong University',
        iconType: 'grad',
      },
      {
        id: 'h-oracle',
        title: 'Oracle 19c / 21c',
        subtitle: '& Data Guard',
        iconType: 'oracle',
      },
      {
        id: 'h-win',
        title: 'Windows Server',
        subtitle: 'Active Directory',
        iconType: 'windows',
      },
      {
        id: 'h-gis',
        title: 'ArcGIS',
        subtitle: 'Enterprise',
        iconType: 'arcgis',
      },
      {
        id: 'h-sec',
        title: 'Info Security',
        subtitle: 'Backup & Continuity',
        iconType: 'shield',
      },
    ],
    about: {
      headingVi: 'About Me',
      headingEn: 'Về tôi',
      summary:
        'Master of Information Technology with 16 years of hands-on experience in network infrastructure, server administration, enterprise databases, and internal software development. Proven capability in governing and optimizing large-scale IT ecosystems for stability, security, and operational excellence.',
      values: [
        'Discipline & Accountability',
        'Systems Thinking',
        'Innovative Solutions',
        'Quality-Driven Execution',
      ],
      moreBtn: 'Learn More',
    },
    skillsSection: {
      headingVi: 'Core Skills',
      headingEn: 'Năng lực chuyên môn',
      clickHint: 'Select any competency tile to inspect full details',
    },
    projectsSection: {
      headingVi: 'Featured Projects',
      headingEn: 'Dự án tiêu biểu',
      viewAll: 'View All',
      viewDetails: 'View Details',
    },
    experienceSection: {
      headingVi: 'Work Experience',
      headingEn: 'Kinh nghiệm làm việc',
      viewDetails: 'View Details',
    },
    educationSection: {
      headingVi: 'Education',
      headingEn: 'Trình độ học vấn',
      degree: 'Master of Information Technology',
      school: 'Lac Hong University',
      details: [
        'Major: Information Technology',
        'Software Engineering Specialist Certificate',
        'English Certificate B1',
      ],
    },
    contactSection: {
      headingVi: 'Contact',
      headingEn: 'Thông tin liên hệ',
      phoneLabel: 'Phone:',
      emailLabel: 'Email:',
      addressLabel: 'Location:',
      addressValue: 'Dong Nai, Vietnam',
      qrCaption: 'Scan QR for Zalo',
      sendMsgBtn: 'Send Direct Message',
      copied: 'Copied',
    },
    footer: {
      tagline: 'Technology creates value – Empowering enterprises toward the future',
      copyright: '© 2026 Hoang Van Thien. All rights reserved.',
    },
    profile: {
      brandName: 'HOANG VAN THIEN',
      fullName: 'Hoang Van Thien',
      title: 'IT Supervisor | IT Infrastructure & Database Management',
      targetRole: 'Target Position: Head of IT Department (IT Supervisor)',
      location: 'Trang Dai Ward, Dong Nai City, Vietnam',
      ...COMMON,
      cvPdfUrl: '/cv/CV_Hoang_Van_Thien_IT_Supervisor_EN.pdf',
      heroLead:
        'Master of Information Technology with 16 years of experience in IT infrastructure management, Windows Server administration, enterprise databases (Oracle 19c/21c, Data Guard, SQL Server), ArcGIS Enterprise, and C# .NET software development.',
      education: [
        {
          period: 'Master Degree',
          degree: 'Master of Information Technology',
          school: 'Lac Hong University',
        },
        {
          period: 'Specialization',
          degree: 'Software Engineering Specialist',
          school: 'Enterprise application analysis, architecture, and development',
        },
        {
          period: 'Language',
          degree: 'English Certificate B1',
          school: 'CEFR B1 Proficiency Framework',
        },
      ],
    },
    competencies: [
      {
        id: 'comp-infra',
        index: '01.',
        title: 'IT Infrastructure',
        shortSubtitle: '(Network & Server)',
        theme: 'blue',
        iconKey: 'server',
        items: [
          'LAN/WAN, Internet connectivity, and enterprise network operations.',
          'Windows Server, Active Directory, and core system services.',
          'Server resource governance, hardware assets, and user directory management.',
          'Performance monitoring, preventive maintenance, and rapid incident resolution.',
        ],
      },
      {
        id: 'comp-db',
        index: '02.',
        title: 'Database Admin',
        shortSubtitle: '(Oracle, SQL Server)',
        theme: 'rose',
        iconKey: 'database',
        items: [
          'Administration and tuning for Oracle Database 19c/21c & Microsoft SQL Server.',
          'Oracle Data Guard Primary/Standby high-availability architecture.',
          'Automated backup scheduling and disaster recovery validation.',
          'Strict access control and data integrity governance.',
        ],
      },
      {
        id: 'comp-sec',
        index: '03.',
        title: 'Info Security',
        shortSubtitle: '(Security)',
        theme: 'emerald',
        iconKey: 'shield',
        items: [
          'Structured backup and recovery frameworks ensuring Business Continuity.',
          'Least-privilege access control and internal resource protection.',
          'Proactive security monitoring, threat detection, and remediation.',
          'Failover readiness planning to minimize service downtime.',
        ],
      },
      {
        id: 'comp-dev',
        index: '04.',
        title: 'Software Dev',
        shortSubtitle: '(C# .NET, ReactJS, API)',
        theme: 'indigo',
        iconKey: 'code',
        pillars: [
          {
            label: 'Database Design',
            stack: 'Oracle 19c/21c · SQL Server · ERD & Indexing',
            detail:
              'Normalized relational schema modeling, high-performance SQL/PL-SQL tuning, strategic indexing, and strict enterprise data integrity.',
          },
          {
            label: 'Modern Frontend',
            stack: 'ReactJS · TypeScript · Tailwind CSS · Responsive UI/UX',
            detail:
              'Component-driven SPA engineering with clean state management, intuitive UI/UX, and seamless responsiveness across desktop and mobile.',
          },
          {
            label: 'Backend RESTful API',
            stack: 'C# .NET / ASP.NET Core · Node.js · JWT & OpenAPI',
            detail:
              'Layered RESTful API architecture with standardized JSON contracts, JWT/RBAC security, asynchronous processing, and scalable integration.',
          },
        ],
        items: [
          'Database Design: Relational modeling (ERD), schema normalization on Oracle & SQL Server, query tuning, and Stored Procedures.',
          'Modern Frontend: Component-based SPA interfaces built with ReactJS, TypeScript, and responsive UI/UX principles.',
          'Backend RESTful API: Clean-architecture REST services in C# .NET / ASP.NET Core & Node.js with JWT authentication, RBAC, and OpenAPI specs.',
          'End-to-End Integration: Seamless Web, Mobile, and core DB connectivity to digitize and automate enterprise workflows.',
        ],
      },
      {
        id: 'comp-gis',
        index: '05.',
        title: 'GIS Enterprise',
        shortSubtitle: '(ArcGIS)',
        theme: 'cyan',
        iconKey: 'map',
        items: [
          'End-to-end deployment and operation of ArcGIS Enterprise.',
          'Administration of ArcGIS Server and ArcGIS Portal tiers.',
          'Operational support for specialized spatial data and GIS workflows.',
          'Troubleshooting and query optimization for enterprise geospatial services.',
        ],
      },
      {
        id: 'comp-lead',
        index: '06.',
        title: 'Team Leadership',
        shortSubtitle: '(Team Coordination)',
        theme: 'amber',
        iconKey: 'users',
        items: [
          'Strategic planning for IT operations, maintenance, and infrastructure upgrades.',
          'Task delegation, coordination, and technical progress oversight.',
          'Service desk quality assurance and responsive end-user support.',
          'Cross-department collaboration, vendor management, and IT cost optimization.',
        ],
      },
    ],
    projects: [
      {
        id: 'proj-archive-system',
        title: 'Document Archive & Warehouse Management System',
        shortTitle: 'Archive Warehouse Management System',
        category: 'Software & DB',
        subtitle: 'C# .NET + Oracle',
        year: 'Process Digitization',
        platform: 'C# .NET · Oracle Database',
        role: 'System Analyst, DB Designer & Lead Developer',
        visualType: 'archive-system',
        summary:
          'Surveyed operational workflows, designed the Oracle relational schema, and built a C# .NET management application to digitize archive intake, search, and tracking.',
        scope: [
          'Analyzed end-to-end archive warehouse business workflows.',
          'Designed normalized relational schemas on Oracle Database.',
          'Engineered C# .NET management software for intake, fast lookup, borrowing, and audit tracking.',
          'Standardized record handling and data validation protocols.',
        ],
        impact:
          'Digitized archive operations, eliminated manual effort, improved retrieval speed, and reduced operating costs.',
        deliverables: ['Business Analysis', 'Oracle Schema', 'C# .NET App', 'Workflow Standardization'],
      },
      {
        id: 'proj-oracle-dataguard',
        title: 'Oracle 19c/21c & Data Guard Operations',
        shortTitle: 'Oracle Data Guard Operations',
        category: 'Infrastructure & HA',
        subtitle: 'Primary / Standby',
        year: 'High Availability',
        platform: 'Oracle Database 19c/21c · Data Guard',
        role: 'Database & Disaster Recovery Administrator',
        visualType: 'oracle-dataguard',
        summary:
          'Managed production Oracle databases backed by Primary/Standby Data Guard replication, ensuring real-time synchronization, verified backups, and rapid failover readiness.',
        scope: [
          'Administered and tuned resource utilization for Oracle Database 19c/21c.',
          'Monitored redo log transport and synchronization between Primary and Standby nodes.',
          'Executed periodic backups, recovery drills, and database incident resolution.',
          'Enforced granular access controls to ensure uninterrupted availability.',
        ],
        impact:
          'Delivered proven production resilience with redundant failover architecture protecting critical enterprise data.',
        deliverables: ['Oracle 19c/21c', 'Data Guard Primary/Standby', 'Backup & Recovery', 'Sync Monitoring'],
      },
      {
        id: 'proj-arcgis-enterprise',
        title: 'ArcGIS Enterprise System Deployment',
        shortTitle: 'ArcGIS Enterprise Deployment',
        category: 'Enterprise GIS',
        subtitle: 'GIS & Spatial Data',
        year: 'Enterprise Application',
        platform: 'ArcGIS Enterprise · Server · Portal',
        role: 'Enterprise Application Administrator',
        visualType: 'arcgis-enterprise',
        summary:
          'Deployed, governed, and maintained an integrated geospatial application ecosystem spanning ArcGIS Enterprise, ArcGIS Server, and ArcGIS Portal.',
        scope: [
          'Installed, configured, and administered ArcGIS Enterprise, Server, and Portal tiers.',
          'Coordinated spatial geodatabase governance and role-based map service access.',
          'Monitored application server resources and optimized spatial query throughput.',
        ],
        impact:
          'Ensured seamless 24/7 operations for a multi-component enterprise system managing specialized spatial datasets.',
        deliverables: ['ArcGIS Enterprise', 'ArcGIS Server & Portal', 'Spatial Governance', 'Performance Tuning'],
      },
      {
        id: 'proj-mobile-enterprise',
        title: 'Enterprise Mobile Application Design & Deployment',
        shortTitle: 'Mobile App Design & Deployment',
        category: 'Mobile App',
        subtitle: 'iOS & Android · REST API',
        year: 'Mobility & Integration',
        platform: 'Cross-Platform Mobile · RESTful API · Oracle/SQL',
        role: 'UI/UX Designer, Mobile Architect & Deployment Lead',
        visualType: 'mobile-app',
        summary:
          'Analyzed mobile workflows, designed intuitive cross-platform UI/UX, and deployed enterprise iOS & Android applications integrated securely with core databases.',
        scope: [
          'Conducted field workflow discovery and designed intuitive mobile UI/UX tailored for iOS and Android.',
          'Architected cross-platform mobile applications connected via secure RESTful APIs to Oracle / SQL Server.',
          'Implemented role-based authentication, push notifications, and resilient data synchronization.',
          'Executed performance testing, app packaging, and enterprise-wide rollout for operational staff.',
        ],
        impact:
          'Enabled anytime, anywhere record lookup, field reporting, and approvals on mobile devices, accelerating operational response.',
        deliverables: ['Mobile UI/UX', 'iOS & Android', 'Secure REST API', 'Enterprise Rollout'],
      },
      {
        id: 'proj-command-operations',
        title: 'Unit Executive Command & Operations Platform',
        shortTitle: 'Executive Command & Operations App',
        category: 'Command & Operations',
        subtitle: 'KPI Dashboard · Task Coordination',
        year: 'Digital Governance',
        platform: 'Web & Mobile Dashboard · C# .NET · Oracle/SQL',
        role: 'Business Analyst, System Architect & Rollout Lead',
        visualType: 'command-operations',
        summary:
          'Designed and deployed a centralized command-and-operations application enabling unit leadership and department heads to track KPIs, monitor task SLAs, approve workflows, and coordinate daily operations in real time.',
        scope: [
          'Analyzed executive command workflows, task assignment, progress reporting, and internal approvals across departments.',
          'Designed Executive KPI Dashboards visualizing case throughput, departmental performance, and SLA bottleneck alerts.',
          'Integrated cross-department task coordination, automated reminders, and live data feeds from core enterprise databases.',
          'Rolled out role-based workspaces for leadership, department managers, and operational specialists.',
        ],
        impact:
          'Strengthened leadership visibility, standardized cross-unit accountability, and drastically reduced manual status reporting cycles.',
        deliverables: ['Executive Dashboard', 'Task Coordination', 'KPI & SLA Tracking', 'Operational Reports'],
      },
    ],
    experiences: [
      {
        id: 'exp-1',
        period: '2010-2016',
        duration: '(6 Years)',
        role: 'Network Infrastructure, HelpDesk & Software Specialist',
        organization: 'Land Registration Office – Dong Nai Department of Natural Resources and Environment',
        location: 'Dong Nai, Vietnam',
        summary:
          'Delivered province-wide internal network HelpDesk across headquarters and 11 branches, maintained core LAN/WAN & Windows servers, and built foundational internal apps.',
        highlights: [
          'Provided full internal network HelpDesk for the Provincial Land Registration Office and 11 branches across Dong Nai, standardizing incident response workflows.',
          'Deployed and maintained LAN/WAN networks, Windows Server environments, and foundational SQL Server / Oracle databases.',
          'Developed internal software tools (C# .NET) to digitize record workflows and directly support departmental operations.',
        ],
      },
      {
        id: 'exp-2',
        period: '2016 – 2026',
        duration: '(10 Years)',
        role: 'IT Supervisor — Infrastructure, Database, GIS & Software',
        organization: 'IT Center – Dong Nai City Department of Agriculture and Environment',
        location: 'Dong Nai, Vietnam',
        summary:
          'Supervised enterprise IT infrastructure, high-availability databases, ArcGIS Enterprise platforms, internal software engineering, and vendor SLA governance.',
        highlights: [
          'Administered LAN/WAN, Windows Server, Oracle 19c/21c (Data Guard HA) & SQL Server databases with strict backup, security, and business-continuity standards.',
          'Operated ArcGIS Enterprise (Server, Portal) and mission-critical enterprise applications at high reliability.',
          'Architected internal software (C# .NET, ReactJS, Node.js), planned infrastructure upgrades, and coordinated technical staff and external vendors.',
        ],
      },
    ],
    techStackTable: [
      { group: 'Database', technologies: 'Oracle Database 19c/21c, Microsoft SQL Server' },
      { group: 'High Availability', technologies: 'Oracle Data Guard, Primary/Standby' },
      { group: 'Server', technologies: 'Windows Server, Active Directory' },
      { group: 'Enterprise GIS', technologies: 'ArcGIS Enterprise, ArcGIS Server, Portal' },
      { group: 'Programming', technologies: 'C# .NET, ReactJS, Node.js' },
      { group: 'Networking', technologies: 'LAN/WAN, TCP/IP' },
      { group: 'Data Protection', technologies: 'Backup, Recovery, Data Security' },
      { group: 'IT Management', technologies: 'System Administration, IT Operations, Technical Coordination' },
    ],
    projectModal: {
      closeLabel: 'Close project details',
      roleHeading: 'Role & Ownership',
      techHeading: 'Technology & Platform',
      impactHeading: 'Business Value',
      scopeHeading: 'Scope of Execution',
      footerPrompt: 'Would you like to discuss the architecture behind this system?',
      contactBtn: 'Discuss Directly',
      prevProject: 'Previous project',
      nextProject: 'Next project',
    },
    cvModal: {
      headerTitle: 'Curriculum Vitae',
      downloadOriginalPdf: 'Original PDF',
      printBtn: 'Print Page',
      closeLabel: 'Close CV viewer',
      summaryHeading: 'Professional Profile',
      experienceHeading: 'Work Experience (2010 – 2026)',
      projectsHeading: 'Key Projects',
      educationHeading: 'Education',
      techStackHeading: 'Technical Skills',
    },
    contactModal: {
      title: 'Send Direct Message',
      subtitle: 'Connect directly with Hoang Van Thien regarding IT Supervisor roles or infrastructure consulting.',
      nameLabel: 'Full Name / Organization',
      namePlaceholder: 'e.g., HR Department / Hiring Manager',
      emailLabel: 'Email Address',
      emailPlaceholder: 'hr@company.com',
      subjectLabel: 'Subject',
      subjectPlaceholder: 'Interview Invitation for IT Supervisor',
      messageLabel: 'Message',
      messagePlaceholder: 'Share interview schedule or consultation details...',
      requiredError: 'Please enter your name, email, and message.',
      emailError: 'Please enter a valid email address.',
      submitBtn: 'Compose & Send Email',
      successTitle: 'Message Ready to Send!',
      successDesc:
        'Your email client has been triggered with your message pre-filled. If it did not open automatically, use the buttons below to reopen or copy the message for Zalo.',
      openMailBtn: 'Open Email App',
      copyContentBtn: 'Copy Message',
      copiedContentBtn: 'Copied!',
      zaloFallbackBtn: 'Chat on Zalo',
      closeBtn: 'Close',
    },
  },
};

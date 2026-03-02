/* =============================================
   NSEE Portfolio — Internationalisation (i18n)
   Supported: en (English) | pt (Portuguese)
   ============================================= */

const translations = {
  en: {
    /* ---- Navbar ---- */
    "nav.home":     "Home",
    "nav.about":    "About",
    "nav.team":     "Team",
    "nav.projects": "Projects",
    "nav.contact":  "Contact",

    /* ---- Index ---- */
    "hero.tagline":  "Laboratory of Embedded Electronic Systems at Mauá Institute of Technology",
    "hero.desc":     "We develop technological solutions with a focus on engineering rigour, technical precision, and direct application to real-world problems in industry, science, and the space sector.",
    "hero.cta1":     "Discover NSEE",
    "hero.cta2":     "View Portfolio",
    "hero.scroll":   "Scroll",

    /* ---- Stats ---- */
    "stats.projects":   "Active Projects",
    "stats.partners":   "Partner Institutions",
    "stats.researchers":"Researchers",
    "stats.areas":      "Research Areas",

    /* ---- Partners ---- */
    "partners.tag":   "Our Partners",
    "partners.title": "Trusted by Leading Institutions",

    /* ---- About ---- */
    "about.tag":        "Who We Are",
    "about.title":      "About NSEE",
    "about.p1":         "NSEE — Núcleo de Sistemas Eletrônicos Embarcados — is a research and development group at Mauá Institute of Technology (IMT), dedicated to building technological solutions with a strong foundation in engineering, technical rigour, and direct application to real problems in industry, science, and the space sector.",
    "about.p2":         "Our work spans space instrumentation, artificial intelligence applied to health and data science, astrophysics research, and the development of software and scientific visualisation tools for world-class telescopes such as the Giant Magellan Telescope (GMT).",
    "about.p3":         "We maintain active partnerships with leading institutions including ESA, DLR, GMTO, FMABC, and international research universities — delivering consistent scientific and technological impact.",
    "about.pillars.tag":    "Research Areas",
    "about.pillars.title":  "What We Work On",
    "about.cta":            "Work with us",
    "pillar1.title": "Space Technology",
    "pillar1.text":  "Space camera and spectrometer simulators for ESA missions (PLATO, EnVision), hardware virtualisation, and ground station infrastructure.",
    "pillar2.title": "AI & Data Science",
    "pillar2.text":  "Machine learning applied to oncology, assisted reproduction, ECG interpretation, and causal inference in health data.",
    "pillar3.title": "Astrophysics",
    "pillar3.text":  "Black hole mass determination, James Webb data analysis, exoplanet detection, and galactic nucleus classification.",
    "pillar4.title": "Giant Magellan Telescope",
    "pillar4.text":  "Software and graphical interfaces for GMT subsystem monitoring, 3D visualisation of mirror data, and computational support tools for GMTO.",

    /* ---- Timeline ---- */
    "timeline.tag":   "Our History",
    "timeline.title": "Key Milestones",
    "tl.filter.all":   "All",
    "tl.filter.space": "Space",
    "tl.filter.ai":    "AI & Data Science",
    "tl.filter.gmt":   "GMT",
    "tl2003.year": "2003", "tl2003.title": "CoRoT Satellite Emulator — OBSPM",
    "tl2003.desc": "Vanderlei Parro joins OBSPM (Paris) as a CAPES post-doctoral visiting researcher to work on emulation for the CoRoT space satellite.",
    "tl2006.year": "2006", "tl2006.title": "1st FAPESP Regular Grant — CoRoT",
    "tl2006.desc": "FAPESP Regular grant awarded for filtering ground-segment data for the CoRoT mission.",
    "tl2007.year": "2007", "tl2007.title": "French Cooperation & Early SimuCam Prototype",
    "tl2007.desc": "Partnership with CNES (Toulouse) and one-month FAPESP research stay in France. An IMT student develops the first camera simulator — the prototype that would become SimuCam.",
    "tl2008.year": "2008", "tl2008.title": "CNRS Collaboration & the PLATO Idea",
    "tl2008.desc": "CNRS funds a research visit to France to explore new cooperative projects after CoRoT. The idea of applying the simulator work to ESA's PLATO mission emerges here.",
    "tl2009.year": "2009", "tl2009.title": "CubeSats (AEB) & First PLATO Funding (CNPq)",
    "tl2009.desc": "AEB approves a CubeSat monitoring project (turtle tracking). Simultaneously, CNPq approves the first funding grant dedicated to the PLATO mission.",
    "tl2010.year": "2010", "tl2010.title": "PLATO–SimuCam Cooperation with OBSPM",
    "tl2010.desc": "French researchers visit IMT for a PLATO seminar, consolidating the bilateral collaboration that would drive SimuCam development.",
    "tl2011.year": "2011", "tl2011.title": "First Official SimuCam Delivery to France",
    "tl2011.desc": "IMT students and faculty present the first official SimuCam deliverable to OBSPM in France — a landmark milestone for the SpaceWire-based camera simulator.",
    "tl2013.year": "2013", "tl2013.title": "DLR & ESA Join SimuCam; CITAR Project",
    "tl2013.desc": "DLR requests a customised SimuCam application, broadening the European partnership. Simultaneously, the CITAR project launches via FINEP with CTI, INPE, AEB, IFUSP, IEAv, and FEI.",
    "tl2015.year": "2015", "tl2015.title": "1st Brafitec-CAPES, Double Degree & NIRPS Instrument",
    "tl2015.desc": "CAPES approves the 1st Brafitec project (SEAC) led by Mauá with École des Mines de Saint-Étienne, including industry involvement and a full double-degree programme. NSEE is also invited to collaborate on the NIRPS instrument for ESO's VLT telescopes.",
    "tl2016.year": "2016", "tl2016.title": "ELT — HIRES Instrument (ESO / Florence)",
    "tl2016.desc": "In cooperation with the University of Florence, NSEE participates in the Phase-B defence of the HIRES (now ANDES) instrument for ESO's Extremely Large Telescope. The contribution is recognised as instrumental to the instrument's approval.",
    "tl2017.year": "2017", "tl2017.title": "First International Course for EMSE Students",
    "tl2017.desc": "First international course offered to École des Mines de Saint-Étienne students during Mauá's Technology Week, covering embedded control systems.",
    "tl2018.year": "2018", "tl2018.title": "Giant Magellan Telescope — First Collaboration",
    "tl2018.desc": "NSEE begins its first GMT project in cooperation with Carnegie Observatories (Pasadena, CA). A FAPESP and GMTO post-doctoral grant is awarded for the project.",
    "tl2019.year": "2019", "tl2019.title": "Carnegie Contract Concluded & SimuCam–LESIA Integration",
    "tl2019.desc": "The Carnegie project concludes and a three-year GMT contract is initiated. In January, the first SimuCam integration session with the LESIA team takes place at IMT.",
    "tl2020.year": "2020", "tl2020.title": "CDIA Area Created — Public Health",
    "tl2020.desc": "NSEE creates the Data Science & Artificial Intelligence (CDIA) research area, initially focused on public health applications, including circadian risk analysis in partnership with Swansea University.",
    "tl2021.year": "2021", "tl2021.title": "Harvard Partnership — AI in Health (USD 500k)",
    "tl2021.desc": "Following a USD 500,000 research funding agreement, NSEE begins collaborating with Harvard University. The ConeCta-SP cancer survival project and an ECG deep-learning programme with Beneficência Portuguesa involve 20+ researchers.",
    "tl2022.year": "2022", "tl2022.title": "Final SimuCam Delivery — Four Countries",
    "tl2022.desc": "Engineers Rodrigo França and Daniel Gueter complete the final SimuCam delivery, visiting all partner institutions across Italy (INAF), Germany (DLR), France (OBSPM), and Austria (IWF).",
    "tl2023.year": "2023", "tl2023.title": "NASA/JPL Invitation, 1st BSATA & Nature Publication",
    "tl2023.desc": "NSEE is invited to participate in NASA's Veritas and EnVision missions through the DLR relationship. The first BSATA event gathers key partners. A colorectal cancer CDIA paper is published in Nature.",
    "tl2024.year": "2024", "tl2024.title": "EnVision Mission Formalised & 2nd GMT Contract",
    "tl2024.desc": "NSEE officially joins ESA's EnVision mission (Venus) with DLR and Max Planck. Prof. Roberto Menezes joins the mission science team. A second GMT software contract worth USD 140,000 is signed.",
    "tl2025.year": "2025", "tl2025.title": "2nd Brafitec-CAPES & CentraleSupélec Partnership",
    "tl2025.desc": "A second Brafitec project is approved in partnership with CentraleSupélec, benefitting 12 Mauá students and 36 Brazilians in total.",

    /* ---- Team ---- */
    "team.tag":   "People",
    "team.title": "Our Team",
    "team.desc":  "Researchers, engineers, and students working together on real-world technology challenges across space, AI, and astrophysics.",
    "role.coordinator":        "Coordinator",
    "role.researcher":          "Researcher",
    "role.dev":                 "Software Engineer",
    "role.data":                "Data Scientist",
    "role.embedded":            "Embedded Systems Engineer",
    "role.member":              "Member",
    "role.intern":              "Intern",
    "role.fellow":              "Research Fellow",
    "role.fapesp-student":      "FAPESP Scholar",
    "role.project-manager":     "Project Manager",
    "role.fapesp-researcher":   "FAPESP TT5 Researcher",
    "role.project-leader":      "Project Leader",
    "member.linkedin":          "LinkedIn",
    "member.lattes":            "Lattes",

    /* ---- Projects ---- */
    "projects.tag":   "Our Work",
    "projects.title": "Projects & Cases",
    "projects.desc":  "Real-world technological initiatives across space engineering, artificial intelligence, astrophysics, and scientific instrumentation.",

    "filter.all":   "All",
    "filter.space": "Space",
    "filter.ai":    "AI & Data Science",
    "filter.astro": "Astrophysics",
    "filter.gmt":   "GMT",

    "cat.space":  "Space Technologies",
    "cat.ai":     "Data Science & Artificial Intelligence",
    "cat.astro":  "Astrophysics & Data Science",
    "cat.gmt":    "Giant Magellan Telescope (GMT)",

    /* Space */
    "sp1.title": "SimuCam – PLATO Mission (ESA)",
    "sp1.desc":  "Space camera simulator developed for validation and testing of ESA's PLATO mission. Activities include maintenance of delivered units, participation in validation campaigns, and development of automated test systems.",
    "sp1.partners": "Partners: ESA, LESIA, DLR, IWF, INAF",
    "sp1.status": "Status: In operation and continuous evolution",

    "sp2.title": "SimuCam – EnVision Mission (ESA)",
    "sp2.desc":  "Spectrometer simulator for the EnVision mission studying the surface of Venus. Involves RISC-V multi-core architecture, IP Core PUS implementation, and fault injection mechanisms.",
    "sp2.partners": "Partners: DLR, ABP, ESA",
    "sp2.status": "Status: In advanced development",

    "sp3.title": "QEMULA – Missão VERITAS/ENVISION",
    "sp3.desc":  "Hardware and software virtualisation platform for space instruments. Includes VenSpec-M spectrometer virtualisation, SpaceWire protocol simulation, GUI development, and error injection systems.",
    "sp3.partners": "Partners: DLR, ESA",
    "sp3.status": "Status: Functional deliveries complete, consolidation phase",

    "sp4.title": "Ground Station",
    "sp4.desc":  "Installation of a ground station at IMT for satellite signal reception. Activities include antenna development, physical and logical infrastructure, and integration with the SatNOGS system.",
    "sp4.partners": "",
    "sp4.status": "Status: Implementation phase",

    /* AI */
    "ai1.title": "ConeCta-SP – Cancer Survival Prediction",
    "ai1.desc":  "Application of machine learning models for survival analysis in oncological patients. Includes comparison of AI models vs. statistical methods, scenario creation, and curation of clinical databases. Over twenty researchers involved.",
    "ai1.partners": "",
    "ai1.status": "Status: Active",

    "ai2.title": "AI Applied to Assisted Human Reproduction",
    "ai2.desc":  "Data science and AI for process optimisation in assisted human reproduction. Clinical data extraction pipeline and database consolidation for AI application.",
    "ai2.partners": "Partner: FMABC",
    "ai2.status": "Status: Database consolidated, models in development",

    "ai3.title": "AI Applied to Health – Electrocardiograms",
    "ai3.desc":  "Anomaly detection and automatic ECG interpretation using deep learning. Database with over 1.5 million exams and a proprietary data validation platform.",
    "ai3.partners": "Partner: Beneficência Portuguesa de São Paulo",
    "ai3.status": "Status: Active",

    "ai4.title": "Causal Inference in Health Data",
    "ai4.desc":  "Statistical and computational methods for causal inference in complex datasets, focused on oncological and public health data. Uses causal graph algorithms and Partial Ancestral Graphs (PAGs).",
    "ai4.partners": "Partners: ConeCta-SP, international research universities",
    "ai4.status": "Status: In development and methodological consolidation",

    /* Astro */
    "as1.title": "Applications in Astrophysics",
    "as1.desc":  "Black hole mass determination, James Webb Space Telescope data analysis, exoplanet detection with machine learning, and galactic nucleus classification. Methods include Butterworth filtering, Richardson-Lucy deconvolution, and spectral data cube analysis.",
    "as1.partners": "",
    "as1.status": "Status: Active",

    /* GMT */
    "gm1.title": "Software & Graphical Interfaces for GMT",
    "gm1.desc":  "Software for operation and monitoring of GMT subsystems, with advanced visualisation and graphical interfaces for critical systems. Includes volumetric representation of primary mirror data, thermal monitoring (M1), and bending mode visualisation.",
    "gm1.partners": "Partner: Giant Magellan Telescope Organization (GMTO)",
    "gm1.status": "Status: In continuous development",

    "gm2.title": "Scientific Visualisation & GMT Support Systems",
    "gm2.desc":  "Scientific visualisation tools and computational support for GMT data analysis and operations. 3D visualisation of experimental data, large-volume data rendering, and integration with GMTO software pipelines.",
    "gm2.partners": "Partner: Giant Magellan Telescope Organization (GMTO)",
    "gm2.status": "Status: In development",

    /* Portfolio CTA */
    "portfolio.title": "Full Portfolio",
    "portfolio.desc":  "Access our complete portfolio document with all projects, cases, and achievements.",
    "portfolio.btn":   "Download Portfolio (PDF)",
    "portfolio.view":  "View Portfolio Online",

    /* ---- Contact ---- */
    "contact.tag":          "Get In Touch",
    "contact.title":        "Contact Us",
    "contact.desc":         "Have a question or a partnership proposal? We'd love to hear from you.",
    "contact.form.name":    "Your Name",
    "contact.form.email":   "Your Email",
    "contact.form.subject": "Subject",
    "contact.form.message": "Message",
    "contact.form.send":    "Send Message",

    /* ---- Footer ---- */
    "footer.rights": "© 2026 NSEE — Mauá Institute of Technology. All rights reserved.",
    "footer.made":   "Made with ♥ by NSEE",
  },

  pt: {
    /* ---- Navbar ---- */
    "nav.home":     "Início",
    "nav.about":    "Sobre",
    "nav.team":     "Equipe",
    "nav.projects": "Projetos",
    "nav.contact":  "Contato",

    /* ---- Index ---- */
    "hero.tagline":  "Núcleo de Sistemas Eletrônicos Embarcados no Instituto Mauá de Tecnologia",
    "hero.desc":     "Desenvolvemos soluções tecnológicas com foco em rigor técnico e aplicação direta em problemas reais da indústria, da ciência e do setor espacial.",
    "hero.cta1":     "Conheça o NSEE",
    "hero.cta2":     "Ver Portfólio",
    "hero.scroll":   "Rolar",

    /* ---- Stats ---- */
    "stats.projects":    "Projetos Ativos",
    "stats.partners":    "Instituições Parceiras",
    "stats.researchers": "Pesquisadores",
    "stats.areas":       "Áreas de Pesquisa",

    /* ---- Partners ---- */
    "partners.tag":   "Nossos Parceiros",
    "partners.title": "Parceiros de Referência Mundial",

    /* ---- About ---- */
    "about.tag":        "Quem Somos",
    "about.title":      "Sobre o NSEE",
    "about.p1":         "O NSEE — Núcleo de Sistemas Eletrônicos Embarcados — é um grupo de pesquisa e desenvolvimento do Instituto Mauá de Tecnologia (IMT), dedicado à construção de soluções tecnológicas com foco em engenharia, rigor técnico e aplicação direta em problemas reais da indústria, da ciência e do setor espacial.",
    "about.p2":         "Nossa atuação abrange instrumentação espacial, inteligência artificial aplicada à saúde e ciência de dados, pesquisa em astrofísica, e desenvolvimento de software e ferramentas de visualização científica para telescópios de classe mundial, como o Giant Magellan Telescope (GMT).",
    "about.p3":         "Mantemos parcerias ativas com instituições de referência como ESA, DLR, GMTO, FMABC e universidades de pesquisa internacionais — gerando impacto científico e tecnológico consistente.",
    "about.pillars.tag":    "Áreas de Pesquisa",
    "about.pillars.title":  "Em Que Trabalhamos",
    "about.cta":            "Trabalhe conosco",
    "pillar1.title": "Tecnologias Espaciais",
    "pillar1.text":  "Simuladores de câmeras e espectrómetros para missões da ESA (PLATO, EnVision), virtualização de hardware e infraestrutura de estação terrena.",
    "pillar2.title": "IA & Ciência de Dados",
    "pillar2.text":  "Aprendizado de máquina aplicado à oncologia, reprodução assistida, interpretação de ECG e inferência causal em dados de saúde.",
    "pillar3.title": "Astrofísica",
    "pillar3.text":  "Determinação de massas de buracos negros, análise de dados do James Webb, detecção de exoplanetas e classificação de núcleos galácticos.",
    "pillar4.title": "Giant Magellan Telescope",
    "pillar4.text":  "Software e interfaces gráficas para monitoramento de subsistemas do GMT, visualização volumétrica de dados do espelho e ferramentas de apoio computacional para o GMTO.",

    /* ---- Timeline ---- */
    "timeline.tag":   "Nossa História",
    "timeline.title": "Marcos Importantes",
    "tl.filter.all":   "Todos",
    "tl.filter.space": "Espaço",
    "tl.filter.ai":    "IA & Dados",
    "tl.filter.gmt":   "GMT",
    "tl2003.year": "2003", "tl2003.title": "Emulador do Satélite CoRoT — OBSPM",
    "tl2003.desc": "Vanderlei Parro realiza pós-doutorado visitante no OBSPM (Paris) com bolsa CAPES para trabalhar com emulação para o satélite espacial CoRoT.",
    "tl2006.year": "2006", "tl2006.title": "1ª FAPESP Regular — CoRoT",
    "tl2006.desc": "Aprovação de auxílio Regular FAPESP para filtragem dos dados do segmento de solo da missão CoRoT.",
    "tl2007.year": "2007", "tl2007.title": "Cooperação França e Primórdios do SimuCam",
    "tl2007.desc": "Parceria com o CNES (Toulouse) e estada de pesquisa de um mês na França com bolsa FAPESP. Um aluno do IMT desenvolve o primeiro simulador de câmera — o protótipo que daria origem ao SimuCam.",
    "tl2008.year": "2008", "tl2008.title": "Colaboração CNRS e a Ideia do Projeto PLATO",
    "tl2008.desc": "O CNRS financia uma visita de pesquisa à França para explorar novos projetos cooperativos após o CoRoT. A ideia de aplicar o simulador ao PLATO da ESA surge aqui.",
    "tl2009.year": "2009", "tl2009.title": "CubeSats (AEB) e Primeiro Financiamento PLATO (CNPq)",
    "tl2009.desc": "A AEB aprova projeto de CubeSat para monitoramento de tartarugas. Simultaneamente, o CNPq aprova o primeiro recurso dedicado à missão PLATO.",
    "tl2010.year": "2010", "tl2010.title": "Cooperação PLATO–SimuCam com OBSPM",
    "tl2010.desc": "Pesquisadores franceses visitam o IMT para seminário sobre o PLATO, consolidando a colaboração bilateral que impulsionaria o desenvolvimento do SimuCam.",
    "tl2011.year": "2011", "tl2011.title": "Primeira Entrega Oficial do SimuCam na França",
    "tl2011.desc": "Alunos e professores do IMT apresentam a primeira entrega oficial do SimuCam ao OBSPM na França — marco histórico do simulador de câmera baseado em SpaceWire.",
    "tl2013.year": "2013", "tl2013.title": "DLR e ESA no SimuCam; Projeto CITAR",
    "tl2013.desc": "O DLR solicita uma versão customizada do SimuCam, ampliando a parceria europeia. Paralelamente, o projeto CITAR é lançado via FINEP com CTI, INPE, AEB, IFUSP, IEAv e FEI.",
    "tl2015.year": "2015", "tl2015.title": "1º Brafitec-CAPES, Duplo Diploma e Instrumento NIRPS",
    "tl2015.desc": "A CAPES aprova o 1º Brafitec (SEAC) liderado pela Mauá com a École des Mines de Saint-Étienne, incluindo envolvimento empresarial e programa de duplo diploma. O NSEE também é convidado a colaborar no instrumento NIRPS para os telescópios VLT do ESO.",
    "tl2016.year": "2016", "tl2016.title": "ELT — Instrumento HIRES (ESO / Florença)",
    "tl2016.desc": "Em cooperação com a Universidade de Florença, o NSEE participa da defesa de Fase B do instrumento HIRES (atual ANDES) para o Extremely Large Telescope do ESO. A contribuição é reconhecida como decisiva para a aprovação do instrumento.",
    "tl2017.year": "2017", "tl2017.title": "Primeiro Curso Internacional para Alunos da EMSE",
    "tl2017.desc": "Primeiro curso internacional oferecido a alunos da École des Mines de Saint-Étienne na Semana de Tecnologia da Mauá, na área de controle embarcado.",
    "tl2018.year": "2018", "tl2018.title": "Giant Magellan Telescope — Primeira Colaboração",
    "tl2018.desc": "O NSEE inicia seu primeiro projeto com o GMT em cooperação com o Carnegie Observatories (Pasadena, CA). Bolsa de pós-doutorado FAPESP e GMTO é aprovada para o projeto.",
    "tl2019.year": "2019", "tl2019.title": "Contrato GMT e Integração SimuCam–LESIA",
    "tl2019.desc": "O projeto Carnegie é concluído e inicia-se um contrato de três anos com o GMT. Em janeiro, ocorre a primeira integração do SimuCam com a equipe LESIA no IMT.",
    "tl2020.year": "2020", "tl2020.title": "Criação da Área CDIA — Saúde Pública",
    "tl2020.desc": "O NSEE cria a área de Ciência de Dados e Inteligência Artificial (CDIA), inicialmente voltada à saúde pública, incluindo análise de risco por ciclos circadianos em parceria com a Swansea University.",
    "tl2021.year": "2021", "tl2021.title": "Parceria com Harvard — IA na Saúde (USD 500 mil)",
    "tl2021.desc": "Após aprovação de financiamento de pesquisa de USD 500.000, o NSEE passa a colaborar com Harvard. O projeto ConeCta-SP e o programa de deep learning em ECGs com a Beneficência Portuguesa envolvem mais de 20 pesquisadores.",
    "tl2022.year": "2022", "tl2022.title": "Entrega Final do SimuCam — Quatro Países",
    "tl2022.desc": "Os engenheiros Rodrigo França e Daniel Gueter concluem a entrega final do SimuCam, visitando todas as instituições parceiras: Itália (INAF), Alemanha (DLR), França (OBSPM) e Áustria (IWF).",
    "tl2023.year": "2023", "tl2023.title": "NASA/JPL, 1º BSATA e Publicação na Nature",
    "tl2023.desc": "O NSEE é convidado a participar das missões Veritas e EnVision da NASA por meio do relacionamento com o DLR. Realiza-se o 1º BSATA com os principais parceiros. Artigo de CDIA em câncer colorretal é publicado na revista Nature.",
    "tl2024.year": "2024", "tl2024.title": "Missão EnVision Oficializada e 2º Contrato GMT",
    "tl2024.desc": "O NSEE oficializa sua participação na missão ESA EnVision (Vênus) com DLR e Max Planck. O Prof. Roberto Menezes integra a equipe de cientistas da missão. Um segundo contrato de software com o GMT, no valor de USD 140.000, é assinado.",
    "tl2025.year": "2025", "tl2025.title": "2º Brafitec-CAPES e Parceria com CentraleSupélec",
    "tl2025.desc": "Segundo projeto Brafitec aprovado em parceria com a CentraleSupélec, beneficiando 12 alunos da Mauá e 36 brasileiros no total.",

    /* ---- Team ---- */
    "team.tag":   "Pessoas",
    "team.title": "Nossa Equipe",
    "team.desc":  "Pesquisadores, engenheiros e estudantes trabalhando juntos em desafios tecnológicos reais nas áreas espacial, de IA e astrofísica.",
    "role.coordinator":        "Coordenador(a)",
    "role.researcher":          "Pesquisador(a)",
    "role.dev":                 "Engenheiro(a) de Software",
    "role.data":                "Cientista de Dados",
    "role.embedded":            "Engenheiro(a) de Sistemas Embarcados",
    "role.member":              "Membro",
    "role.intern":              "Estagiário(a)",
    "role.fellow":              "Pesquisador(a) Bolsista",
    "role.fapesp-student":      "Bolsista FAPESP",
    "role.project-manager":     "Gerente de Projetos",
    "role.fapesp-researcher":   "Pesquisadora TT5-FAPESP",
    "role.project-leader":      "Líder de Projeto",
    "member.linkedin":          "LinkedIn",
    "member.lattes":            "Lattes",

    /* ---- Projects ---- */
    "projects.tag":   "Nosso Trabalho",
    "projects.title": "Projetos & Cases",
    "projects.desc":  "Iniciativas tecnológicas reais nas áreas de engenharia espacial, inteligência artificial, astrofísica e instrumentação científica.",

    "filter.all":   "Todos",
    "filter.space": "Espaço",
    "filter.ai":    "IA & Dados",
    "filter.astro": "Astrofísica",
    "filter.gmt":   "GMT",

    "cat.space":  "Tecnologias Espaciais",
    "cat.ai":     "Ciência de Dados e Inteligência Artificial",
    "cat.astro":  "Astrofísica e Ciência de Dados",
    "cat.gmt":    "Giant Magellan Telescope (GMT)",

    /* Space */
    "sp1.title": "SimuCam – Missão PLATO (ESA)",
    "sp1.desc":  "Simulador de câmeras espaciais para validação e testes da missão PLATO da ESA. Inclui manutenção das unidades entregues, participação em campanhas de validação e desenvolvimento de sistemas automáticos de teste.",
    "sp1.partners": "Parcerias: ESA, LESIA, DLR, IWF, INAF",
    "sp1.status": "Status: Em operação e evolução contínua",

    "sp2.title": "SimuCam – Missão EnVision (ESA)",
    "sp2.desc":  "Simulador de espectrómetros para a missão EnVision, voltada ao estudo da superfície de Vênus. Envolve arquitetura RISC-V multi-core, implementação de IP Core PUS e mecanismos de injeção de falhas.",
    "sp2.partners": "Parcerias: DLR, ABP, ESA",
    "sp2.status": "Status: Em desenvolvimento avançado",

    "sp3.title": "QEMULA – Missão VERITAS/ENVISION",
    "sp3.desc":  "Plataforma de virtualização de hardware e software embarcado para instrumentos espaciais. Inclui virtualização do espectrômetro VenSpec-M, simulação do protocolo SpaceWire, desenvolvimento de GUI e sistema de injeção de erros.",
    "sp3.partners": "Parcerias: DLR, ESA",
    "sp3.status": "Status: Entregas funcionais realizadas, em fase de consolidação",

    "sp4.title": "Estação Terrena",
    "sp4.desc":  "Implantação de uma estação terrena no IMT para recepção de sinais de satélites. Inclui desenvolvimento de antenas, infraestrutura física e lógica, e integração com o sistema SatNOGS.",
    "sp4.partners": "",
    "sp4.status": "Status: Em fase de implantação",

    /* AI */
    "ai1.title": "ConeCta-SP – Predição de Sobrevida em Câncer",
    "ai1.desc":  "Aplicação de modelos de aprendizado de máquina para análise de sobrevida de pacientes oncológicos. Comparação entre modelos de IA e métodos estatísticos, curadoria de bases de dados clínicas. Mais de vinte pesquisadores envolvidos.",
    "ai1.partners": "",
    "ai1.status": "Status: Ativo",

    "ai2.title": "IA Aplicada à Reprodução Humana Assistida",
    "ai2.desc":  "Uso de ciência de dados e IA para otimização de processos em reprodução humana. Pipeline de extração de dados clínicos e consolidação de base de dados para aplicação de IA.",
    "ai2.partners": "Parceria: FMABC",
    "ai2.status": "Status: Base consolidada, modelos em desenvolvimento",

    "ai3.title": "IA Aplicada à Saúde – Eletrocardiogramas",
    "ai3.desc":  "Detecção de anomalias e interpretação automática de ECGs por meio de deep learning. Base com mais de 1,5 milhão de exames e plataforma própria de validação de dados.",
    "ai3.partners": "Parceria: Beneficência Portuguesa de São Paulo",
    "ai3.status": "Status: Ativo",

    "ai4.title": "Causalidade Aplicada a Dados em Saúde",
    "ai4.desc":  "Métodos estatísticos e computacionais de inferência causal para identificação de relações de causa e efeito em dados oncológicos e de saúde pública. Utiliza algoritmos de grafos causais e Partial Ancestral Graphs (PAGs).",
    "ai4.partners": "Parcerias: ConeCta-SP, universidades e centros de pesquisa internacionais",
    "ai4.status": "Status: Em desenvolvimento e consolidação metodológica",

    /* Astro */
    "as1.title": "Aplicações em Astrofísica",
    "as1.desc":  "Determinação de massas de buracos negros, análise de dados do Telescópio Espacial James Webb, detecção de exoplanetas com machine learning e classificação de núcleos galácticos. Metodologias: filtragem de Butterworth, deconvolução de Richardson-Lucy e análise de cubos de dados espectrais.",
    "as1.partners": "",
    "as1.status": "Status: Ativo",

    /* GMT */
    "gm1.title": "Desenvolvimento de Software e Interfaces Gráficas para o GMT",
    "gm1.desc":  "Software para suporte à operação e monitoramento de subsistemas do GMT, com interfaces gráficas avançadas. Inclui representação volumétrica de dados do espelho primário, monitoramento térmico (M1) e visualização de modos de deformação.",
    "gm1.partners": "Parceria: Giant Magellan Telescope Organization (GMTO)",
    "gm1.status": "Status: Em desenvolvimento contínuo",

    "gm2.title": "Visualização Científica e Sistemas de Apoio ao GMT",
    "gm2.desc":  "Ferramentas de visualização científica e apoio computacional para análise de dados e operação do GMT. Visualização tridimensional de dados experimentais, renderização de grandes volumes de dados e integração com pipelines do GMTO.",
    "gm2.partners": "Parceria: Giant Magellan Telescope Organization (GMTO)",
    "gm2.status": "Status: Em desenvolvimento",

    /* Portfolio CTA */
    "portfolio.title": "Portfólio Completo",
    "portfolio.desc":  "Acesse nosso documento completo com todos os projetos, cases e conquistas.",
    "portfolio.btn":   "Baixar Portfólio (PDF)",
    "portfolio.view":  "Visualizar Portfólio Online",

    /* ---- Contact ---- */
    "contact.tag":          "Fale Conosco",
    "contact.title":        "Contato",
    "contact.desc":         "Tem uma dúvida ou proposta de parceria? Adoraríamos ouvir de você.",
    "contact.form.name":    "Seu Nome",
    "contact.form.email":   "Seu E-mail",
    "contact.form.subject": "Assunto",
    "contact.form.message": "Mensagem",
    "contact.form.send":    "Enviar Mensagem",

    /* ---- Footer ---- */
    "footer.rights": "© 2026 NSEE — Instituto Mauá de Tecnologia. Todos os direitos reservados.",
    "footer.made":   "Feito com ♥ pelo NSEE",
  }
};

/* ---- Core i18n functions ---- */

function getLang() {
  const stored = localStorage.getItem('nsee-lang');
  if (stored) return stored;
  const browser = (navigator.language || 'en').toLowerCase();
  return browser.startsWith('pt') ? 'pt' : 'en';
}

function setLang(lang) {
  if (!translations[lang]) return;
  localStorage.setItem('nsee-lang', lang);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = translations[lang][key];
    if (val !== undefined) el.textContent = val;
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const val = translations[lang][key];
    if (val !== undefined) el.placeholder = val;
  });

  /* Update toggle button label */
  const btn = document.getElementById('langToggle');
  if (btn) btn.textContent = lang === 'en' ? 'PT' : 'EN';

  /* Update <html lang> attribute */
  document.documentElement.lang = lang;
}

function toggleLang() {
  const current = getLang();
  setLang(current === 'en' ? 'pt' : 'en');
}

/* Auto-init on DOMContentLoaded */
document.addEventListener('DOMContentLoaded', () => {
  setLang(getLang());

  const btn = document.getElementById('langToggle');
  if (btn) btn.addEventListener('click', toggleLang);
});

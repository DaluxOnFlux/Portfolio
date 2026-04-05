import React, { useState, useEffect } from "react";
import ChatBot from "./ChatBot";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Code,
  Layout,
  Server,
  Briefcase,
  Database,
  Globe,
  BookOpen,
  GraduationCap,
  School,
  Terminal as TerminalIcon,
  Mail,
  ArrowUp,
  Github,
  Linkedin,
} from "lucide-react";
import Typewriter from "typewriter-effect";
import "./App.css";
import TerminalComponent from "./Terminal.jsx";
import StatusBadge from "./StatusBadge.jsx";

const App = () => {
  const [showButton, setShowButton] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setShowButton(window.scrollY > 400);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fadeInUp = isMobile
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 },
      };

  return (
    <div className="app-container">

      {/* Navigation */}
      <nav className="glass-nav">
        <div
          className="logo"
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
        >
          <motion.span
            animate={{ x: isLogoHovered && !isMobile ? -22 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bracket"
          >
            {"{"}
          </motion.span>

          <div className="logo-letters">
            <motion.span
              animate={{ x: isLogoHovered && !isMobile ? -12 : 0 }}
              className="letter"
            >
              D
            </motion.span>

            <div className="terminal-trigger-container">
              <AnimatePresence>
                {isLogoHovered && !isMobile && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    onClick={() => setIsTerminalOpen(true)}
                    className="terminal-trigger-icon"
                  >
                    <TerminalIcon size={16} />
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <motion.span
              animate={{ x: isLogoHovered && !isMobile ? 12 : 0 }}
              className="letter"
            >
              H
            </motion.span>
          </div>

          <motion.span
            animate={{ x: isLogoHovered && !isMobile ? 22 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bracket"
          >
            {"}"}
          </motion.span>
        </div>

        <div className="nav-links desktop-nav">
          <a href="#parcours">Parcours</a>
          <a href="#competences">Compétences</a>
          <a href="#projets">Projets</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* Hero */}
      <header className="hero">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: isMobile ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0.3 : 0.8 }}
        >
          <motion.div
            className="hero-image-container"
            initial={{ scale: isMobile ? 1 : 0 }}
            animate={{ scale: 1 }}
            transition={
              isMobile
                ? { duration: 0.3 }
                : { type: "spring", stiffness: 260, damping: 20, delay: 0.2 }
            }
          >
            <img
              src="/images/photo_id.jpg"
              alt="Dalil HIANE"
              className="hero-avatar"
            />
          </motion.div>

          <div className="hero-text">
            <h1>
              Dalil <span>HIANE</span>
            </h1>

            <div className="current-work-badge">
              <Briefcase size={16} />
              <div className="badge-text-content">
                <Typewriter
                  options={{
                    strings: ["Ingénieur DevOps", "Développeur FullStack"],
                    autoStart: true,
                    loop: true,
                    deleteSpeed: 50,
                  }}
                />
                <span className="company-name">&nbsp;— Préfecture de Police</span>
              </div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* SECTION PARCOURS */}
      <section id="parcours">
        <motion.h2 {...fadeInUp} className="section-title">
          <School size={14} /> Parcours
        </motion.h2>
        <div className="timeline">
          <ExperienceCard
            date="2023 — 2026"
            title="Ingénieur Informatique (Alternance)"
            company="Préfecture de Police de Paris"
            school="ESIEE Paris"
            schoolUrl="https://www.esiee.fr/"
            desc="Formation d'ingénieur en informatique et applications, en trois ans, sous contrat d'apprentissage habilité par la Commission des Titres d'Ingénieur (CTI)."
            icon={<Code size={18} />}
          />
          <ExperienceCard
            date="2021 — 2023"
            title="BTS SIO SISR — Option Cybersécurité (Alternance)"
            company="Préfecture de Police de Paris"
            school="UTEC Emerainville"
            schoolUrl="https://www.utec77.fr/"
            desc="Gestion, administration et sécurisation des infrastructures réseaux."
            icon={<Shield size={18} />}
          />
          <ExperienceCard
            date="2018 — 2021"
            title="BAC Général — Mathématiques, Sciences de l'Ingénieur"
            school="Lycée Gaston Bachelard"
            company="Chelles"
            schoolUrl="http://www.lyceebachelardchelles.fr"
            desc="Obtention du Baccalauréat Général."
            icon={<BookOpen size={18} />}
          />
        </div>
      </section>

      {/* SECTION COMPÉTENCES */}
      <section id="competences">
        <motion.h2 {...fadeInUp} className="section-title">
          <TerminalIcon size={14} /> Compétences
        </motion.h2>
        <div className="skills-container">
          <div className="skill-category glass-card">
            <Layout size={20} className="icon-blue" />
            <h3>Front End</h3>
            <div className="tech-tags">
              <span>Next.js</span>
              <span>React</span>
              <span>Vue.js</span>
              <span>TailwindCSS</span>
              <span>JavaScript</span>
            </div>
          </div>
          <div className="skill-category glass-card">
            <Server size={20} className="icon-purple" />
            <h3>Back End & Data</h3>
            <div className="tech-tags">
              <span>Node.js</span>
              <span>PHP</span>
              <span>Python</span>
              <span>MySQL</span>
              <span>MongoDB</span>
              <span>Pandas</span>
            </div>
          </div>
          <div className="skill-category glass-card">
            <Shield size={20} className="icon-red" />
            <h3>DevOps & Infra</h3>
            <div className="tech-tags">
              <span>Docker</span>
              <span>Kubernetes</span>
              <span>Linux</span>
              <span>Bash/Shell</span>
              <span>Git/GitHub</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION PROJETS */}
      <section id="projets">
        <motion.h2 {...fadeInUp} className="section-title">
          <Database size={14} /> Réalisations
        </motion.h2>
        <div className="projects-grid">
          <ProjectCard
            title="Système Solaire OpenGL"
            tag="Graphisme & Bas Niveau"
            videoSrc="/videos/opengl.mp4"
            desc="Simulation 3D d'un système solaire utilisant les shaders et les matrices de transformation."
            tech={["C", "C++", "CMake", "OpenGL"]}
            link="https://github.com/DaluxOnFlux/ProjetOpenGL"
          />
          <ProjectCard
            title="Laboratoire BTS SIO SISR"
            tag="Infrastructure"
            videoSrc="/videos/btssio.mp4"
            desc="Ensemble de TP et projets portant sur l'administration réseau et la sécurisation d'infrastructures."
            tech={["Linux", "Cisco", "Windows Server", "VPN"]}
            link="https://github.com/DaluxOnFlux/Projets-TP-en-BTS-SIO-SISR"
          />
          <ProjectCard
            title="Whippin-World"
            tag="Game Development"
            videoSrc="/videos/whippinworld.mp4"
            desc="Jeu vidéo développé sous Unity avec création de shaders personnalisés (HLSL/ShaderLab)."
            tech={["Unity", "C#", "ShaderLab", "HLSL"]}
            githubLink="https://github.com/DaluxOnFlux/Whippin-World"
            notionLink="https://www.notion.so/E4FI-Projet-Alassane-Traore-Dalil-Hiane-2024-2025-1-2d1be0e2edb3804ca4ffc1269ed8b38a"
          />
          <ProjectCard
            title="PacMan-IA"
            tag="Intelligence Artificielle"
            videoSrc="/videos/pacman.mp4"
            desc="Implémentation d'algorithmes de recherche et d'IA pour automatiser le jeu PacMan."
            tech={["Python", "Algorithmique"]}
            link="https://github.com/DaluxOnFlux/PacMan-IA-Projet-E3"
          />
          <ProjectCard
            title="Space Invaders"
            tag="Software Architecture"
            videoSrc="/videos/spaceinvaders.mp4"
            desc="Recréation du jeu classique en mettant l'accent sur les patterns de conception logicielle."
            tech={["C#", "OOP"]}
            link="https://github.com/DaluxOnFlux/Space-Invaders-Projet-E3"
          />
          <ProjectCard
            title="Quiz App"
            tag="Dev Front & Back"
            videoSrc="/videos/quizapp.mp4"
            desc="Application web complète permettant de passer un quiz avec score final et une interface admin sécurisée pour gérer les questions."
            tech={["Vite", "Vue3", "Flask", "SQLite", "HTML", "CSS"]}
            link="https://github.com/DaluxOnFlux/quiz_app"
          />
          <ProjectCard
            title="GStreamer Streamer & Recorder"
            tag="Système & Multimédia"
            videoSrc="/videos/pipeline.mp4"
            desc="Système de capture d'écran temps réel avec diffusion réseau UDP (RTP/JPEG) et archivage local simultané via des pipelines GStreamer complexes."
            tech={["GStreamer", "Direct3D11", "UDP/RTP", "Networking", "Batch"]}
            link="https://github.com/DaluxOnFlux/gst-screen-recorder"
          />
          <ProjectCard
            title="ARM Assembly Motor Control"
            tag="Systèmes Embarqués"
            videoSrc="/videos/motor.mp4"
            desc="Développement en Assembleur ARM Cortex-M4 pour le pilotage de moteurs pas à pas. Gestion précise des registres GPIO et des séquences de commutation de phases."
            tech={["Assembly ARM", "Cortex-M4", "Embedded Systems", "GPIO"]}
            link="https://github.com/DaluxOnFlux/arm-cortex-m4-stepper-control"
          />
          <ProjectCard
            title="US Health Data Dashboard"
            tag="Data Engineering"
            videoSrc="/videos/dashboard-covid.mp4"
            desc="Dashboard interactif analysant les données de mortalité du CDC. Pipeline de récupération automatisé et visualisations dynamiques."
            tech={["Python", "Dash", "Plotly", "Pandas", "ETL"]}
            link="https://github.com/DaluxOnFlux/Covid19-Data-Analysis-Python"
          />
          <ProjectCard
            title="Objet Réel à l'Art Kirigami"
            tag="Photogrammétrie & Art"
            videoSrc="/videos/real_art_video.mp4"
            desc="Numérisation 3D d'une peluche Yoshi via photogrammétrie et transformation en modèle papercraft physique de 100 triangles."
            tech={["Agisoft", "Meshlab", "Houdini", "Graphite", "Pepakura"]}
            link="/real-art-1.html"
            isWebsite={true}
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact">
        <div className="footer-content">
          <motion.div
            className="contact-card"
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            viewport={{ once: true }}
          >
            <h2>On collabore ?</h2>
            <p className="footer-subtitle">
              Actuellement en quête de nouveaux défis en{" "}
              <span>DevOps</span> et <span>Développement Web</span>.
            </p>

            <div className="social-links">
              <a href="mailto:hianedalil4@gmail.com" className="social-icon mail">
                <Mail size={22} />
                <span className="tooltip">Email</span>
              </a>
              <a
                href="https://github.com/DaluxOnFlux"
                target="_blank"
                rel="noreferrer"
                className="social-icon github"
              >
                <Github size={22} />
                <span className="tooltip">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/hianeda/"
                target="_blank"
                rel="noreferrer"
                className="social-icon linkedin"
              >
                <Linkedin size={22} />
                <span className="tooltip">LinkedIn</span>
              </a>
            </div>

            <div className="footer-bottom">
              <p>© 2026 Dalil HIANE</p>
              <div className="infra-stack">
                <span className="stack-item">
                  <Server size={11} /> AWS EC2
                </span>
                <span className="stack-divider">|</span>
                <span className="stack-item">
                  <Database size={11} /> K3s (Kubernetes)
                </span>
                <span className="stack-divider">|</span>
                <span className="stack-item">
                  <Shield size={11} /> Traefik + Cert-Manager
                </span>
                <span className="stack-divider">|</span>
                <span className="stack-item">
                  <Shield size={11} /> GitHub Actions CI/CD
                </span>
              </div>
              <StatusBadge />
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Scroll to top */}
      <AnimatePresence>
        {showButton && (
          <motion.div
            className="scroll-to-top"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ position: "fixed", bottom: "24px", left: "24px", zIndex: 1000 }}
          >
            <ArrowUp size={18} />
          </motion.div>
        )}
      </AnimatePresence>

      <TerminalComponent
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      <ChatBot />
    </div>
  );
};

const ExperienceCard = React.memo(({
  date,
  title,
  company,
  school,
  schoolUrl,
  desc,
  icon,
}) => (
  <motion.div
    variants={{
      initial: { opacity: 0, x: -20 },
      whileInView: { opacity: 1, x: 0 },
    }}
    initial="initial"
    whileInView="whileInView"
    viewport={{ once: true }}
    className="experience-card glass-card"
  >
    <div className="exp-icon">{icon}</div>
    <div className="exp-content">
      <span className="exp-date">{date}</span>
      <h3>{title}</h3>
      <div className="exp-locations">
        <div className="loc-item">
          <Briefcase size={13} className="icon-pro" />
          <span>{company}</span>
        </div>
        <div className="loc-separator">/</div>
        <div className="loc-item">
          <GraduationCap size={14} className="icon-edu" />
          <a
            href={schoolUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="school-link"
          >
            {school}
          </a>
        </div>
      </div>
      <p>{desc}</p>
    </div>
  </motion.div>
));

const ProjectCard = React.memo(({
  title,
  tag,
  desc,
  tech,
  link,
  githubLink,
  notionLink,
  videoSrc,
  isWebsite,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobileCard = window.innerWidth <= 768;

  return (
    <motion.div
      className="project-card glass-card"
      whileHover={isMobileCard ? {} : { y: -4 }}
      onMouseEnter={() => !isMobileCard && setIsHovered(true)}
      onMouseLeave={() => !isMobileCard && setIsHovered(false)}
    >
      <div className={`project-video-container ${isHovered ? "visible" : ""}`}>
        {videoSrc && isHovered && !isMobileCard && (
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="project-video"
          />
        )}
      </div>

      <div className="project-content">
        <div className="project-header">
          {isWebsite ? <Globe size={14} /> : <Github size={14} />}
          <span className="project-tag">{tag}</span>
        </div>
        <h3>{title}</h3>
        <p>{desc}</p>

        <div className="project-tech">
          {tech.map((t, index) => (
            <small key={index}>#{t} </small>
          ))}
        </div>

        <div className="project-links-container">
          {(githubLink || link) && (
            <a
              href={githubLink || link}
              target="_blank"
              rel="noreferrer"
              className="project-link"
            >
              {isWebsite ? (
                <>Projet <Globe size={12} /></>
              ) : (
                <>GitHub <Github size={12} /></>
              )}
            </a>
          )}
          {notionLink && (
            <a
              href={notionLink}
              target="_blank"
              rel="noreferrer"
              className="project-link"
            >
              Notion <BookOpen size={12} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
});

export default App;

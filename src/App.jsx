import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Code,
  Layout,
  Server,
  Briefcase,
  Database,
  Globe,
  ExternalLink,
  BookOpen,
  GraduationCap,
  School,
  Terminal,
  Mail,
  ArrowUp,
  Github,
  Linkedin,
} from "lucide-react";
import Typewriter from "typewriter-effect";
import "./App.css";

const App = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  return (
    <div className="app-container">
      <div className="blob"></div>

      {/* Navigation mise à jour */}
      <nav className="glass-nav">
        <div className="logo">
          <span>{"{"}</span> DH <span>{"}"}</span>
        </div>
        <div className="nav-links desktop-nav">
          <a href="#parcours">Parcours</a>
          <a href="#competences">Compétences</a> {/* Ajout */}
          <a href="#projets">Projets</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <header className="hero">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1>
            Dalil <span>HIANE</span>
          </h1>
          <div className="current-work-badge">
            <Briefcase size={18} />
            <div className="badge-text-content">
              <Typewriter
                options={{
                  strings: ["Ingénieur DevOps", "Développeur FullStack"],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 50,
                }}
              />
              <span className="company-name">à la Préfecture de Police</span>
            </div>
          </div>
        </motion.div>
      </header>

      {/* SECTION PARCOURS */}
      <section id="parcours">
        <motion.h2 {...fadeInUp} className="section-title">
          <School size={32} /> Mon Parcours
        </motion.h2>
        <div className="timeline">
          <ExperienceCard
            date="2023 - 2026"
            title="Ingénieur Informatique (Alternance)"
            company=" Préfecture de Police de Paris"
            school=" ESIEE Paris"
            schoolUrl="https://www.esiee.fr/"
            desc="Une formation d'ingénieur en informatique et applications, en trois ans, en alternance, sous contrat d'apprentissage habilité par Commission des Titres d'Ingénieur (CTI)."
            icon={<Code />}
          />
          <ExperienceCard
            date="2021 - 2023"
            title="BTS SIO SISR (Option Cybersécurité) (Alternance)"
            company=" Préfecture de Police de Paris"
            school=" UTEC Emerainville"
            schoolUrl="https://www.utec77.fr/"
            desc="Gestion, administration et sécurisation des infrastructures réseaux."
            icon={<Shield />}
          />
        </div>
      </section>

      {/* SECTION COMPÉTENCES (Séparée) */}
      <section id="competences">
        <motion.h2 {...fadeInUp} className="section-title">
          <Terminal size={32} /> Skills
        </motion.h2>
        <div className="skills-container">
          <div className="skill-category glass-card">
            <Layout size={24} className="icon-blue" />
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
            <Server size={24} className="icon-purple" />
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
            <Shield size={24} className="icon-red" />
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

      {/* SECTION PROJETS (Séparée) */}
      <section id="projets">
        <motion.h2 {...fadeInUp} className="section-title">
          <Database size={32} /> Mes Réalisations
        </motion.h2>
        <div className="projects-grid">
          {/* Projet 1: OpenGL */}
          <ProjectCard
            title="Système Solaire OpenGL"
            tag="Graphisme & Bas Niveau"
            videoSrc="/videos/opengl.mp4"
            desc="Simulation 3D d'un système solaire utilisant les shaders et les matrices de transformation."
            tech={["C", "C++", "CMake", "OpenGL"]}
            link="https://github.com/DaluxOnFlux/ProjetOpenGL"
          />

          {/* Projet 2: BTS SISR */}
          <ProjectCard
            title="Laboratoire BTS SIO SISR"
            tag="Infrastructure"
            videoSrc="/videos/btssio.mp4"
            desc="Ensemble de TP et projets portant sur l'administration réseau et la sécurisation d'infrastructures."
            tech={["Linux", "Cisco", "Windows Server", "VPN"]}
            link="https://github.com/DaluxOnFlux/Projets-TP-en-BTS-SIO-SISR"
          />

          {/* Projet 4: Unity */}
          <ProjectCard
            title="Whippin-World"
            tag="Game Development"
            videoSrc="/videos/whippinworld.mp4"
            desc="Jeu vidéo développé sous Unity avec création de shaders personnalisés (HLSL/ShaderLab)."
            tech={["Unity", "C#", "ShaderLab", "HLSL"]}
            githubLink="https://github.com/DaluxOnFlux/Whippin-World"
            notionLink="https://www.notion.so/E4FI-Projet-Alassane-Traore-Dalil-Hiane-2024-2025-16d517b07e2280c78a45d8d081d62273"
          />

          {/* Projet 5: PacMan IA */}
          <ProjectCard
            title="PacMan-IA"
            tag="Intelligence Artificielle"
            videoSrc="/videos/pacman.mp4"
            desc="Implémentation d'algorithmes de recherche et d'IA pour automatiser le jeu PacMan."
            tech={["Python", "Algorithmique"]}
            link="https://github.com/DaluxOnFlux/PacMan-IA-Projet-E3"
          />

          {/* Projet 3: Space Invaders */}
          <ProjectCard
            title="Space Invaders"
            tag="Software Architecture"
            videoSrc="/videos/spaceinvaders.mp4"
            desc="Recréation du jeu classique en mettant l'accent sur les patterns de conception logicielle."
            tech={["C#", "OOP"]}
            link="https://github.com/DaluxOnFlux/Space-Invaders-Projet-E3"
          />

          {/* Projet 4: Projet Quiz App */}
          <ProjectCard
            title="Quiz App"
            tag="Dev FRONT & BACK"
            videoSrc="/videos/quizapp.mp4"
            desc="Une application web complète permettant à un joueur de passer un quiz avec score final, et à un administrateur d'ajouter, modifier ou supprimer des questions via une interface sécurisée."
            tech={["Vite", "Vue3", "Flask", "SQLite", "HTML", "CSS"]}
            link="https://github.com/DaluxOnFlux/quiz_app"
          />

          {/* Projet 5: GStreamer Screen Recorder & Streamer */}
          <ProjectCard
            title="GStreamer Streamer & Recorder"
            tag="Système & Multimédia"
            videoSrc="/videos/pipeline.mp4"
            desc="Développement d'un système de capture d'écran temps réel avec diffusion réseau UDP (RTP/JPEG) et archivage local simultané via des pipelines GStreamer complexes."
            tech={["GStreamer", "Direct3D11", "UDP/RTP", "Networking", "Batch"]}
            link="https://github.com/DaluxOnFlux/gst-screen-recorder"
          />

          {/* Projet 6: Pilotage Moteur Pas à Pas (Bas niveau) */}
          <ProjectCard
            title="ARM Assembly Motor Control"
            tag="Systèmes Embarqués"
            videoSrc="/videos/motor.mp4"
            desc="Développement en Assembleur ARM Cortex-M4 pour le pilotage de moteurs pas à pas. Gestion précise des registres GPIO, des cycles d'horloge et des séquences de commutation de phases."
            tech={[
              "Assembly ARM",
              "Cortex-M4",
              "Embedded Systems",
              "GPIO",
              "Micro-architecture",
            ]}
            link="https://github.com/DaluxOnFlux/arm-cortex-m4-stepper-control"
          />
        </div>
      </section>

      {/* FOOTER & SCROLL BUTTON */}
      <footer id="contact">
        <div className="footer-content">
          <motion.div
            className="glass-card contact-card"
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.9 }}
            viewport={{ once: true }}
          >
            <h2>On collabore ?</h2>
            <p className="footer-subtitle">
              Actuellement en quête de nouveaux défis en <span>DevOps</span> et{" "}
              <span>Développement Web</span>.
            </p>

            <div className="social-links">
              <a
                href="mailto:hianedalil4@gmail.com"
                className="social-icon mail"
              >
                <Mail size={28} />
                <span className="tooltip">Email</span>
              </a>
              <a
                href="https://github.com/DaluxOnFlux"
                target="_blank"
                rel="noreferrer"
                className="social-icon github"
              >
                <Github size={28} />
                <span className="tooltip">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/hianeda/"
                target="_blank"
                rel="noreferrer"
                className="social-icon linkedin"
              >
                <Linkedin size={28} />
                <span className="tooltip">LinkedIn</span>
              </a>
            </div>

            <div className="footer-bottom">
              <p>© 2025 Dalil HIANE</p>
            </div>
          </motion.div>
        </div>
      </footer>

      <AnimatePresence>
        {showButton && (
          <motion.div
            className="scroll-to-top"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={24} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ExperienceCard = ({
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
          <Briefcase size={14} className="icon-pro" />
          <span>{company}</span>
        </div>
        <div className="loc-separator"> </div>
        <div className="loc-item">
          <GraduationCap size={16} className="icon-edu" />
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
);

const ProjectCard = ({
  title,
  tag,
  desc,
  tech,
  link,
  githubLink,
  notionLink,
  videoSrc,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="project-card glass-card"
      whileHover={{ y: -10 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Container de la vidéo */}
      <div className={`project-video-container ${isHovered ? "visible" : ""}`}>
        {videoSrc && isHovered && (
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
          <Github size={20} />
          <span className="project-tag">{tag}</span>
        </div>
        <h3>{title}</h3>
        <p>{desc}</p>
        {/* ... reste de ton code (tech tags et liens) ... */}
        <div className="project-tech">
          {tech.map((t, index) => (
            <small key={index}>#{t} </small>
          ))}
        </div>

        <div
          className="project-links-container"
          style={{ display: "flex", gap: "15px", marginTop: "15px" }}
        >
          {(githubLink || link) && (
            <a
              href={githubLink || link}
              target="_blank"
              rel="noreferrer"
              className="project-link"
            >
              GitHub <Github size={14} />
            </a>
          )}
          {notionLink && (
            <a
              href={notionLink}
              target="_blank"
              rel="noreferrer"
              className="project-link"
              style={{ color: "#ffffff" }}
            >
              Notion <BookOpen size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default App;

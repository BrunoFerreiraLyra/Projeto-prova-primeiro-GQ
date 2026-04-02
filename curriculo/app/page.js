import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className={styles.title}>Theo Vieira</h1>

      <div className={styles.imagem}>
        <Image
          src="/Recife_antigo.jpg"
          alt="Foto de fundo"
          fill
          className={styles.bg}
          priority
        />

        <div className={styles.perfil}>
          <div className={styles.foto}>
            <Image
              src="/Perfil.jpg"
              alt="Foto de perfil"
              fill
              className={styles.image}
            />
          </div>

          <div className={styles.info}>
            <h2 className={styles.nome}>Theo Vieira Marcelino</h2>

            <div className={styles.lista}>
              <div className={styles.item}>
                <span className={styles.label}>Telefone</span>
                <p>+55 (81) 98815-6678</p>
              </div>

              <div className={styles.item}>
                <span className={styles.label}>Email</span>
                <a href="mailto:theovm2006@gmail.com">theovm2006@gmail.com</a>
              </div>

              <div className={styles.item}>
                <span className={styles.label}>LinkedIn</span>
                <a href="https://linkedin.com/in/theovmarcelino">linkedin.com/in/theovmarcelino</a>
              </div>

              <div className={styles.item}>
                <span className={styles.label}>GitHub</span>
                <a href="https://github.com/TheoVm">github.com/TheoVm</a>
              </div>

              <div className={styles.item}>
                <span className={styles.label}>Endereço</span>
                <p>
                  Rua Marechal Deodoro, 432 Apt 103 <br />
                  Encruzilhada, Recife - PE
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.conteudo}>
        <div className={styles.grid}>
          <section className={styles.card}>
            <h3>Formação</h3>

            <p>UNICAP — Bacharelado em Ciência da Computação</p>

            <div className={styles.divider}></div>

            <p>SOFTEX — Programação Front-End</p>

            <div className={styles.divider}></div>

            <p>SENAC — Técnico em Desenvolvimento de Aplicativos Computacionais</p>
          </section>
          <section className={styles.card}>
            <h3>Habilidades</h3>

            <p><strong>Idiomas</strong></p>
            <p>Português — Nativo</p>
            <p>Inglês — Intermediário</p>

            <div className={styles.divider}></div>

            <p><strong>Tecnologias</strong></p>
            <p>Raylib, React, Git, GitHub, MySQL, Node.js, Next.js</p>

            <div className={styles.divider}></div>

            <p><strong>Linguagens</strong></p>
            <p>Java, C, JavaScript, TypeScript, HTML, CSS, SQL, Python</p>
          </section>

          <section className={styles.card}>
            <h3>Certificados</h3>

            <p><strong>SENAC — 2023</strong></p>
            <p>Desenvolvimento de Aplicativos Computacionais | 620h</p>
            <ul>
              <li>Desenvolvimento de Algoritmos e Banco de Dados</li>
              <li>Codificação de Aplicativos</li>
              <li>Testes, Implantação e Manutenção</li>
              <li>Desenvolvimento Web</li>
            </ul>

            <div className={styles.divider}></div>

            <p><strong>SENAC — 2022</strong></p>
            <p>Operação de Redes de Computadores | 308h</p>
            <ul>
              <li>Instalação de redes locais</li>
              <li>Manutenção de redes</li>
              <li>Configuração de servidores</li>
              <li>Projeto Integrador</li>
            </ul>

            <div className={styles.divider}></div>

            <p><strong>SOFTEX — 2024</strong></p>
            <p>Formação em Front-End | 144h</p>

            <div className={styles.divider}></div>

            <p><strong>SOFTEX — 2025</strong></p>
            <p>Curso Complementar em Programação | 56h</p>
          </section>
        </div>
        <div className={styles.links}>
          <Link href="/forca" className={styles.botao}>
            Forca
          </Link>
        </div>
      </div>
  </div>
  );
}
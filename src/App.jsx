import { useEffect } from "react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
} from "react-router";
import "./App.css";
import Signup from "./Signup.jsx";
import FreeResources from "./FreeResources.jsx";
import NumberTheoryGame from "./NumberTheoryGame.jsx";
import ShapePatternsGame from "./ShapePatternsGame.jsx";
import FractionDecimalPercentGame from "./FractionDecimalPercentGame.jsx";
import AlgebraBalanceGame from "./AlgebraBalanceGame.jsx";
import TrianglePropertiesGame from "./TrianglePropertiesGame.jsx";
import "./SiteEnhancements.css";

const contactEmail = "kapooramogh10@gmail.com";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Navbar() {
  const navLinkClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <header className="navbar">
      <Link className="website-name" to="/">
        <span className="logo-mark" aria-hidden="true">
          ▲
        </span>

        <span>Summit Math Initiative</span>
      </Link>

      <nav aria-label="Main navigation">
        <NavLink className={navLinkClass} to="/">
          Home
        </NavLink>

        <NavLink className={navLinkClass} to="/about">
          About
        </NavLink>

        <NavLink className={navLinkClass} to="/founder">
          Meet the Team
        </NavLink>

        <NavLink className={navLinkClass} to="/programs">
          Programs & Sign Up
        </NavLink>

        <NavLink className={navLinkClass} to="/free-resources">
          Free Resources
        </NavLink>

        <NavLink className={navLinkClass} to="/impact">
          Impact
        </NavLink>

        <NavLink className={navLinkClass} to="/contact">
          Contact
        </NavLink>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <Link className="footer-name" to="/">
          Summit Math Initiative
        </Link>

        <p>
          Free learning opportunities in math, science, and STEM for curious
          students.
        </p>
      </div>

      <div className="footer-links">
        <Link to="/about">About</Link>
        <Link to="/founder">Meet the Team</Link>
        <Link to="/programs">Programs & Sign Up</Link>
        <Link to="/free-resources">Free Resources</Link>
        <Link to="/impact">Impact</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <p className="copyright">
        © {new Date().getFullYear()} Summit Math Initiative
      </p>
    </footer>
  );
}

function PageLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

function Home() {
  return (
    <PageLayout>
      <title>Summit Math Initiative | Free Math & Science Learning</title>
      <meta
        name="description"
        content="Explore free math and science courses, interactive activities, and learning resources from Summit Math Initiative."
      />

      <main>
        <section className="home-hero">
          <div className="hero-content">
            <p className="eyebrow">Free math and science learning</p>

            <h1>
              Explore math and science. Discover what you can do.
            </h1>

            <p className="hero-description">
              Summit Math Initiative offers free courses and resources that
              help students build knowledge, follow their curiosity, and explore
              ideas across math and science.
            </p>

            <div className="button-row">
              <Link className="primary-button" to="/programs">
                View Programs & Sign Up
              </Link>

              <Link className="secondary-button" to="/free-resources">
                Explore Free Resources
              </Link>
            </div>
          </div>

          <div className="summit-visual" aria-hidden="true">
            <div className="visual-sun" />
            <div className="mountain mountain-back" />
            <div className="mountain mountain-middle" />
            <div className="mountain mountain-front" />

            <div className="summit-flag">
              <div className="flag-pole" />
              <div className="flag-shape" />
            </div>

            <div className="visual-message">
              <strong>Reach the summit.</strong>
              <span>One problem at a time.</span>
            </div>
          </div>
        </section>

        <section className="section home-values">
          <div className="section-heading centered-heading">
            <p className="eyebrow">What guides us</p>

            <h2>Curiosity can lead to new possibilities.</h2>

            <p>
              Every student should have room to ask questions, explore new
              ideas, and grow their understanding of math and science.
            </p>
          </div>

          <div className="three-card-grid">
            <article className="information-card">
              <span className="card-number">01</span>

              <h3>Open to Everyone</h3>

              <p>
                Our courses and resources are free, making it easier for
                students to explore new subjects and interests.
              </p>
            </article>

            <article className="information-card">
              <span className="card-number">02</span>

              <h3>Explore and Discover</h3>

              <p>
                Students can build understanding, ask questions, and connect
                what they learn to the world around them.
              </p>
            </article>

            <article className="information-card">
              <span className="card-number">03</span>

              <h3>Growing Together</h3>

              <p>
                We are building a welcoming community for the next generation
                of math and science learners.
              </p>
            </article>
          </div>
        </section>

        <section className="home-founder-preview">
          <div className="home-founder-photo">
            <img
              src="/New_Amogh_Image.png"
              alt="Amogh Kapoor"
            />
          </div>

          <div className="home-founder-text">
            <p className="eyebrow">Meet Amogh</p>

            <h2>Inspired by the many possibilities of STEM.</h2>

            <p>
              Amogh is very interested in STEM, including competitive math,
              biomedical engineering, aerial robotics, and AI. He wants to be
              part of the journey of the next generation of STEM students.
            </p>

            <Link className="primary-button" to="/founder">
              Meet the Team
            </Link>
          </div>
        </section>

        <section className="cta-section">
          <div>
            <p className="eyebrow light-eyebrow">Free learning tools</p>

            <h2>Explore math through interactive activities.</h2>

            <p>
              Try free math activities that build reasoning, number sense, and
              problem-solving skills, with more STEM resources to come.
            </p>
          </div>

          <Link className="light-button" to="/free-resources">
            Explore Resources
          </Link>
        </section>
      </main>
    </PageLayout>
  );
}

function About() {
  return (
    <PageLayout>
      <title>About Us | Summit Math Initiative</title>
      <meta
        name="description"
        content="Learn how Summit Math Initiative creates free opportunities for students to explore math, science, and STEM."
      />

      <main>
        <section className="page-hero">
          <p className="eyebrow">Our mission</p>

          <h1>Every student deserves the chance to explore STEM.</h1>

          <p>
            Summit Math Initiative makes math and science learning more
            accessible through free courses, activities, and resources.
          </p>
        </section>

        <section className="section split-section">
          <div>
            <p className="eyebrow">Why we exist</p>

            <h2>Curiosity deserves the opportunity to grow.</h2>
          </div>

          <div className="large-body-text">
            <p>
              Students are curious about the world around them, but meaningful
              opportunities to explore math and science can be hard to find.
            </p>

            <p>
              Summit Math Initiative offers free courses and resources where
              students can build knowledge, practice problem-solving, and
              explore new ideas.
            </p>

            <p>
              As the initiative grows, we plan to create more opportunities
              across math, science, and other areas of STEM.
            </p>
          </div>
        </section>

        <section className="section values-section">
          <div className="section-heading">
            <p className="eyebrow">Our values</p>

            <h2>The principles behind every Summit program.</h2>
          </div>

          <div className="three-card-grid">
            <article className="information-card">
              <h3>Access</h3>

              <p>
                Learning opportunities should be welcoming and free for
                students to explore.
              </p>
            </article>

            <article className="information-card">
              <h3>Growth</h3>

              <p>
                Asking questions, trying new ideas, and learning from mistakes
                help students grow.
              </p>
            </article>

            <article className="information-card">
              <h3>Community</h3>

              <p>
                Students can learn from one another and share their different
                perspectives and interests.
              </p>
            </article>
          </div>
        </section>

        <section className="section about-founder-section">
          <div className="about-founder-card">
            <div>
              <p className="eyebrow light-eyebrow">Meet Amogh</p>

              <h2>Curious about STEM and the next generation of learners.</h2>

              <p>
                Amogh is very interested in STEM, including competitive math,
                biomedical engineering, aerial robotics, and AI. He wants to be
                part of the journey of the next generation of STEM students.
              </p>

              <Link className="light-button" to="/founder">
                Meet the Team
              </Link>
            </div>

            <div className="about-founder-initials" aria-hidden="true">
              AK
            </div>
          </div>
        </section>
      </main>
    </PageLayout>
  );
}

function Founder() {
  return (
    <PageLayout>
      <title>Meet the Team | Summit Math Initiative</title>
      <meta
        name="description"
        content="Meet the Summit Math Initiative team, including new members Aadish and Mukund, who are being onboarded and leading courses."
      />

      <main>
        <section className="founder-page-hero">
          <div className="team-page-heading">
            <p className="eyebrow">Meet the Team</p>
            <h1>Meet the people helping students reach new heights.</h1>
          </div>

          <div className="team-members-grid">
            <article className="team-member-card">
              <div className="founder-page-photo-column">
                <div className="founder-photo-frame">
                  <img
                    src="/New_Amogh_Image.png"
                    alt="Amogh Kapoor"
                    className="founder-photo"
                  />
                </div>

                <div className="founder-photo-caption">
                  <strong>Amogh</strong>
                  <span>Founder</span>
                </div>
              </div>

              <div className="founder-page-content">
                <h2>Meet Amogh.</h2>

                <p className="founder-page-introduction">
                  Amogh is the founder of Summit Math Initiative.
                </p>

                <p>
                  He is interested in STEM, including competitive math,
                  biomedical engineering, aerial robotics, and AI, and wants to
                  support the next generation of STEM students.
                </p>
              </div>
            </article>

            <article className="team-member-card">
              <div className="founder-page-photo-column">
                <div className="founder-photo-frame">
                  <img
                    src="/Aadish.jpeg"
                    alt="Aadish, a new member of Summit Math Initiative"
                    className="founder-photo"
                  />
                </div>

                <div className="founder-photo-caption">
                  <strong>Aadish</strong>
                  <span>New team member</span>
                </div>
              </div>

              <div className="founder-page-content">
                <h2>Welcome, Aadish.</h2>

                <p className="founder-page-introduction">
                  Aadish is currently being onboarded into Summit Math
                  Initiative.
                </p>

                <p>He is teaching our Intro to Medicine course.</p>
              </div>
            </article>

            <article className="team-member-card">
              <div className="founder-page-photo-column">
                <div
                  className="founder-photo-frame team-member-photo-placeholder"
                  role="img"
                  aria-label="Photo coming soon for Mukund"
                />

                <div className="founder-photo-caption">
                  <strong>Mukund</strong>
                  <span>New team member</span>
                </div>
              </div>

              <div className="founder-page-content">
                <h2>Welcome, Mukund.</h2>

                <p className="founder-page-introduction">
                  Mukund is currently being onboarded into Summit Math
                  Initiative.
                </p>

                <p>He is currently leading our Intro to Geometry course.</p>
              </div>
            </article>
          </div>
        </section>
      </main>
    </PageLayout>
  );
}

function Impact() {
  return (
    <PageLayout>
      <title>Our Impact | Summit Math Initiative</title>
      <meta
        name="description"
        content="See Summit Math Initiative's early impact — hours of instruction, students taught, and free resources built — plus our plans to measure future growth."
      />

      <main>
        <section className="page-hero">
          <p className="eyebrow">Our impact</p>

          <h1>Starting small and building something that lasts.</h1>

          <p>
            We are creating free opportunities for students to explore math
            and science, build skills, and discover where their curiosity can
            take them.
          </p>
        </section>

        <section className="section impact-statistics">
          <div className="stat-card">
            <strong>54</strong>
            <span>Hours of instruction</span>
          </div>

          <div className="stat-card">
            <strong>44</strong>
            <span>Students taught</span>
          </div>

          <div className="stat-card">
            <strong>2</strong>
            <span>Courses taught</span>
          </div>

          <div className="stat-card">
            <strong>5</strong>
            <span>Free resources built</span>
          </div>
        </section>

        <section className="section evidence-section">
          <div>
            <p className="eyebrow">Measuring our work</p>

            <h2>Real impact requires real evidence.</h2>

            <p>
              As Summit Math Initiative grows, we plan to document student
              progress, course participation, instructional hours, parent
              feedback, and program outcomes.
            </p>
          </div>

          <div className="evidence-list">
            <article>
              <span>01</span>

              <div>
                <h3>Student growth</h3>

                <p>
                  Course activities and feedback can help us understand how
                  students grow in their knowledge, skills, and confidence.
                </p>
              </div>
            </article>

            <article>
              <span>02</span>

              <div>
                <h3>Family feedback</h3>

                <p>
                  Approved testimonials will allow parents and students to
                  describe their experiences in their own words.
                </p>
              </div>
            </article>

            <article>
              <span>03</span>

              <div>
                <h3>Annual reporting</h3>

                <p>
                  Future impact reports will summarize enrollment, instruction,
                  curriculum development, resources, partnerships, and
                  outcomes.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="section testimonials-section">
          <div className="section-heading">
            <p className="eyebrow">Testimonials</p>

            <h2>Student and parent experiences.</h2>

            <p>
              Hear from parents about their experience with Summit Math
              Initiative.
            </p>
          </div>

          <div className="testimonial-grid">
            <article className="testimonial-card">
              <p>
                “I highly recommend Amogh as a math tutor. What impressed me
                most was that he didn&apos;t just teach my son to memorize
                formulas — he helped him truly understand the &ldquo;why&rdquo;
                behind the math.”
              </p>

              <span>— Coreen, Parent</span>
            </article>

            <article className="testimonial-card">
              <p>
                “Amogh, you were an excellent tutor for my son during the
                summer program. You brought relevant competition experience,
                which made you especially well-suited for a course based on
                math competitions. You helped my son build both skills and
                confidence.”
              </p>

              <span>— Rajitha, Parent</span>
            </article>
          </div>
        </section>
      </main>
    </PageLayout>
  );
}

function Contact() {
  return (
    <PageLayout>
      <title>Contact Us | Summit Math Initiative</title>
      <meta
        name="description"
        content="Get in touch with Summit Math Initiative — students, parents, educators, and community partners are all welcome to connect with our team."
      />

      <main>
        <section className="page-hero">
          <p className="eyebrow">Contact and interest</p>

          <h1>Help us build the next math or science program.</h1>

          <p>
            Students, parents, volunteers, educators, and community
            organizations are invited to connect with Summit Math Initiative.
          </p>
        </section>

        <section className="section contact-grid">
          <article className="contact-card featured-contact-card">
            <p className="eyebrow">Students and parents</p>

            <h2>Interested in taking a course?</h2>

            <p>
              Review our available courses, class schedules, descriptions, and
              registration form.
            </p>

            <Link className="primary-button" to="/programs">
              View Programs & Sign Up
            </Link>
          </article>

          <article className="contact-card">
            <p className="eyebrow">Free resources</p>

            <h2>Practice independently.</h2>

            <p>
              Explore free interactive math games and learning tools, with more
              STEM resources planned.
            </p>

            <Link className="text-link" to="/free-resources">
              Explore Free Resources →
            </Link>
          </article>

          <article className="contact-card">
            <p className="eyebrow">Community partners</p>

            <h2>Partner with Summit.</h2>

            <p>
              Schools, libraries, community centers, STEM organizations, and
              youth programs can help us reach more students.
            </p>

            <a className="text-link" href={`mailto:${contactEmail}`}>
              Discuss a Partnership →
            </a>
          </article>

          <article className="contact-card">
            <p className="eyebrow">General questions</p>

            <h2>Contact us directly.</h2>

            <p>
              Use the email below for questions about courses, resources,
              volunteering, partnerships, or Summit Math Initiative.
            </p>

            <a className="contact-email" href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
          </article>
        </section>
      </main>
    </PageLayout>
  );
}

function NotFound() {
  return (
    <PageLayout>
      <title>Page Not Found | Summit Math Initiative</title>
      <meta name="robots" content="noindex" />

      <main className="not-found-page">
        <p className="eyebrow">404 error</p>

        <h1>That page could not be found.</h1>

        <p>
          The page may have moved, or the address may have been entered
          incorrectly.
        </p>

        <Link className="primary-button" to="/">
          Return Home
        </Link>
      </main>
    </PageLayout>
  );
}

function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/founder" element={<Founder />} />

        <Route
          path="/programs"
          element={
            <PageLayout>
              <title>Programs & Sign Up | Summit Math Initiative</title>
              <meta
                name="description"
                content="Browse Summit Math Initiative's free online math and science courses and register with a simple form."
              />
              <Signup />
            </PageLayout>
          }
        />

        <Route
          path="/free-resources"
          element={
            <PageLayout>
              <title>Free Math & Science Resources | Summit Math Initiative</title>
              <meta
                name="description"
                content="Explore free interactive math games and learning resources from Summit Math Initiative, with more math and science activities to come."
              />
              <FreeResources />
            </PageLayout>
          }
        />

        <Route
          path="/free-resources/number-theory-sort"
          element={
            <PageLayout>
              <title>Number Theory Sort Game | Summit Math Initiative</title>
              <meta
                name="description"
                content="Sort numbers by primes, composites, factors, multiples, and more in this free interactive number theory practice game for grades 5 and up."
              />
              <NumberTheoryGame />
            </PageLayout>
          }
        />

        <Route
          path="/free-resources/shape-patterns"
          element={
            <PageLayout>
              <title>Shape Patterns Game | Summit Math Initiative</title>
              <meta
                name="description"
                content="Practice figure matrices, shape classification, and paper folding puzzles with this free interactive shape patterns game for grades 3 and up."
              />
              <ShapePatternsGame />
            </PageLayout>
          }
        />

        <Route
          path="/free-resources/fraction-decimal-percent-sort"
          element={
            <PageLayout>
              <title>Fractions, Decimals & Percents Game | Summit Math Initiative</title>
              <meta
                name="description"
                content="Sort fractions, decimals, and percents by equivalence and comparison rules in this free interactive practice game for grades 4 through 6."
              />
              <FractionDecimalPercentGame />
            </PageLayout>
          }
        />

        <Route
          path="/free-resources/algebra-balance"
          element={
            <PageLayout>
              <title>Algebra Equation Balance Game | Summit Math Initiative</title>
              <meta
                name="description"
                content="Solve for x by balancing equations across easy, medium, and hard levels in this free interactive algebra practice game for grades 5 through 8."
              />
              <AlgebraBalanceGame />
            </PageLayout>
          }
        />

        <Route
          path="/free-resources/triangle-properties"
          element={
            <PageLayout>
              <title>Triangle Properties Explorer | Summit Math Initiative</title>
              <meta
                name="description"
                content="Explore triangle angles, sides, and theorems including the Pythagorean theorem in this free interactive geometry game for grades 5 through 8."
              />
              <TrianglePropertiesGame />
            </PageLayout>
          }
        />

        <Route path="/impact" element={<Impact />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
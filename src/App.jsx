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
          Founder
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
          Expanding access to high-quality mathematics education for motivated
          students.
        </p>
      </div>

      <div className="footer-links">
        <Link to="/about">About</Link>
        <Link to="/founder">Founder</Link>
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
      <title>Summit Math Initiative | Free Math Courses & Games</title>
      <meta
        name="description"
        content="Free, high-quality math courses, interactive games, and resources for motivated students — no cost, ever. Explore programs and free resources today."
      />

      <main>
        <section className="home-hero">
          <div className="hero-content">
            <p className="eyebrow">Free mathematics education</p>

            <h1>
              Helping motivated students reach new heights in mathematics.
            </h1>

            <p className="hero-description">
              Summit Math Initiative provides free, high-quality mathematics
              courses, resources, and support so financial circumstances never
              limit a student&apos;s opportunity to learn.
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

            <h2>Opportunity should be determined by motivation.</h2>

            <p>
              Students with the drive to learn should have access to the
              instruction and resources they need to succeed.
            </p>
          </div>

          <div className="three-card-grid">
            <article className="information-card">
              <span className="card-number">01</span>

              <h3>Accessible</h3>

              <p>
                Our programs are free so financial barriers do not prevent
                students from exploring advanced mathematics.
              </p>
            </article>

            <article className="information-card">
              <span className="card-number">02</span>

              <h3>Challenging</h3>

              <p>
                Students learn to reason creatively, communicate ideas, and
                solve unfamiliar problems.
              </p>
            </article>

            <article className="information-card">
              <span className="card-number">03</span>

              <h3>Student-Led</h3>

              <p>
                Summit Math Initiative was created by a student who wanted to
                share meaningful mathematics opportunities with others.
              </p>
            </article>
          </div>
        </section>

        <section className="home-founder-preview">
          <div className="home-founder-photo">
            <img
              src="/amogh-founder.jpg"
              alt="Amogh Kapoor, founder of Summit Math Initiative"
            />
          </div>

          <div className="home-founder-text">
            <p className="eyebrow">Meet the founder</p>

            <h2>Built from a passion for mathematics and expanding access.</h2>

            <p>
              Amogh Kapoor founded Summit Math Initiative after developing his
              own competitive mathematics skills through independent study and
              earning recognition at the state and regional levels.
            </p>

            <Link className="primary-button" to="/founder">
              Read Amogh&apos;s Story
            </Link>
          </div>
        </section>

        <section className="cta-section">
          <div>
            <p className="eyebrow light-eyebrow">Free learning tools</p>

            <h2>Practice mathematics through interactive challenges.</h2>

            <p>
              Explore free games and resources that build reasoning, number
              sense, and problem-solving skills.
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
        content="Learn about Summit Math Initiative's mission to provide free, high-quality mathematics education so financial circumstances never limit opportunity."
      />

      <main>
        <section className="page-hero">
          <p className="eyebrow">Our mission</p>

          <h1>Every motivated student deserves the opportunity to excel.</h1>

          <p>
            Summit Math Initiative believes that access to exceptional
            mathematics education should not depend on a family&apos;s
            financial circumstances.
          </p>
        </section>

        <section className="section split-section">
          <div>
            <p className="eyebrow">Why we exist</p>

            <h2>Talent should never be overlooked because of cost.</h2>
          </div>

          <div className="large-body-text">
            <p>
              Many students are eager to explore mathematics beyond the
              classroom but do not have access to expensive enrichment
              programs, private tutoring, or specialized resources.
            </p>

            <p>
              Summit Math Initiative works to reduce that barrier by providing
              free courses that strengthen problem-solving skills, confidence,
              and mathematical curiosity.
            </p>

            <p>
              As the initiative grows, we plan to develop additional courses
              and free resources for students with different interests,
              experience levels, and academic goals.
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
                High-quality academic opportunities should be available
                regardless of financial circumstances.
              </p>
            </article>

            <article className="information-card">
              <h3>Growth</h3>

              <p>
                Progress comes from curiosity, persistence, reflection, and a
                willingness to attempt difficult problems.
              </p>
            </article>

            <article className="information-card">
              <h3>Community</h3>

              <p>
                Students grow when they can learn with others, ask questions,
                and share different problem-solving approaches.
              </p>
            </article>
          </div>
        </section>

        <section className="section about-founder-section">
          <div className="about-founder-card">
            <div>
              <p className="eyebrow light-eyebrow">Our story</p>

              <h2>Created by a student who understands self-directed learning.</h2>

              <p>
                Summit Math Initiative began with one student independently
                developing an eight-week mathematics curriculum and teaching it
                to motivated students for free.
              </p>

              <Link className="light-button" to="/founder">
                Meet the Founder
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
      <title>Meet the Founder | Summit Math Initiative</title>
      <meta
        name="description"
        content="Meet Amogh Kapoor, founder and lead instructor of Summit Math Initiative, who turned his passion for competitive mathematics into free opportunities for students."
      />

      <main>
        <section className="founder-page-hero">
          <div className="founder-page-photo-column">
            <div className="founder-photo-frame">
              <img
                src="/amogh-founder.jpg"
                alt="Amogh Kapoor, founder of Summit Math Initiative"
                className="founder-photo"
              />
            </div>

            <div className="founder-photo-caption">
              <strong>Amogh Kapoor</strong>
              <span>Founder and Lead Instructor</span>
            </div>
          </div>

          <div className="founder-page-content">
            <p className="eyebrow">Meet the founder</p>

            <h1>
              Turning a passion for mathematics into opportunities for others.
            </h1>

            <p className="founder-page-introduction">
              Amogh Kapoor is the founder and lead instructor of Summit Math
              Initiative. He has a strong background in competitive mathematics
              and has earned recognition at both the state and regional levels.
            </p>

            <p>
              Much of Amogh&apos;s advanced mathematics learning was
              self-directed. Through independent study, competition
              preparation, and challenging problem solving, he experienced both
              the excitement of advanced mathematics and the difficulty of
              finding organized, high-quality resources.
            </p>

            <p>
              That experience inspired him to create Summit Math Initiative. He
              believes motivated students should have access to strong
              instruction, useful learning tools, mentorship, and challenging
              academic opportunities regardless of their financial
              circumstances.
            </p>

            <p>
              Amogh independently developed and taught Summit Math
              Initiative&apos;s inaugural eight-week mathematics curriculum. He
              now plans to expand the initiative by creating additional free
              courses and resources, measuring student growth, and reaching
              more students who are eager to learn.
            </p>

            <div className="founder-page-actions">
              <Link className="primary-button" to="/programs">
                View Programs & Sign Up
              </Link>

              <Link className="secondary-button" to="/free-resources">
                Explore Free Resources
              </Link>
            </div>
          </div>
        </section>

        <section className="section founder-background-section">
          <div className="section-heading centered-heading">
            <p className="eyebrow">Background and purpose</p>

            <h2>Experience that shaped the mission.</h2>
          </div>

          <div className="three-card-grid">
            <article className="information-card founder-background-card">
              <span className="card-number">01</span>

              <h3>Competitive Mathematics</h3>

              <p>
                Amogh has developed his problem-solving skills through
                mathematics competitions and has received recognition at the
                state and regional levels.
              </p>
            </article>

            <article className="information-card founder-background-card">
              <span className="card-number">02</span>

              <h3>Self-Directed Learning</h3>

              <p>
                A large part of his mathematics education came through
                independent learning, practice, experimentation, and searching
                for challenging resources.
              </p>
            </article>

            <article className="information-card founder-background-card">
              <span className="card-number">03</span>

              <h3>Expanding Access</h3>

              <p>
                Summit Math Initiative was created so motivated students can
                receive high-quality mathematics education without cost
                preventing them from participating.
              </p>
            </article>
          </div>
        </section>

        <section className="founder-quote-section">
          <blockquote>
            “Motivation and potential should determine a student&apos;s
            opportunities—not their ability to pay for them.”
          </blockquote>

          <p>— Amogh Kapoor, Founder of Summit Math Initiative</p>
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
            Summit Math Initiative began with one independently developed
            curriculum, four inaugural students, and a commitment to providing
            meaningful mathematics instruction for free.
          </p>
        </section>

        <section className="section impact-statistics">
          <div className="stat-card">
            <strong>35</strong>
            <span>Hours of instruction</span>
          </div>

          <div className="stat-card">
            <strong>18</strong>
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
                  Pre-course and post-course assessments will help measure
                  improvements in mathematical reasoning and confidence.
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

          <h1>Help us build the next Summit Math program.</h1>

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
              Explore interactive mathematics games and learning tools that are
              free for all students.
            </p>

            <Link className="text-link" to="/free-resources">
              Explore Free Resources →
            </Link>
          </article>

          <article className="contact-card">
            <p className="eyebrow">Community partners</p>

            <h2>Partner with Summit.</h2>

            <p>
              Schools, libraries, community centers, mathematics organizations,
              and youth programs can help us reach more students.
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
                content="Browse Summit Math Initiative's free, live online math courses and register with a simple form. No fees, ever — just quality instruction for motivated students."
              />
              <Signup />
            </PageLayout>
          }
        />

        <Route
          path="/free-resources"
          element={
            <PageLayout>
              <title>Free Math Games & Resources | Summit Math Initiative</title>
              <meta
                name="description"
                content="Play free interactive math games covering number theory, fractions, algebra, geometry, and shape patterns — built for motivated students of all levels."
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
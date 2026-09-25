import "./Signup.css";

const signupFormLink =
  "https://docs.google.com/forms/d/e/1FAIpQLSdCasFHg1gNz2aIrqagd-q_WC9qwjcljt1c7Ma0gMCjwGDYkg/viewform";

function Signup() {
  return (
    <main className="signup-page">
      <section className="signup-hero">
        <p className="eyebrow">Course registration</p>

        <h1>Choose a free Summit Math course.</h1>

        <p className="signup-hero-description">
          All Summit Math Initiative courses are completely free and taught
          online through Zoom or Google Meet. Families can request enrollment
          by completing our course registration form.
        </p>

        <div className="signup-highlights">
          <div>
            <strong>100% Free</strong>
            <span>No course or registration fees</span>
          </div>

          <div>
            <strong>Fully Online</strong>
            <span>Classes meet through Zoom or Google Meet</span>
          </div>

          <div>
            <strong>Simple Registration</strong>
            <span>Complete one Google Form to sign up</span>
          </div>
        </div>
      </section>

      <section className="signup-courses">
        <div className="signup-section-heading">
          <p className="eyebrow">Available courses</p>

          <h2>Select the program that interests you.</h2>
        </div>

        <div className="signup-course-grid">
          <article className="signup-course-card signup-featured-course">
            <div className="signup-course-top">
              <div>
                <span className="signup-course-label">
                  October–November 2026 Program
                </span>

                <h2>Intro to Medicine</h2>
              </div>

              <span className="signup-free-badge">Free</span>
            </div>

            <p className="signup-course-description">
              Intro to Medicine is designed for students interested in
              exploring the medical field. Students will learn about
              microbials, drugs, infections, and diseases while getting an
              introduction to the many different fields within medicine and
              the technology used in modern healthcare.
            </p>

            <p className="signup-course-description">
              Through case studies and real-world examples, students will
              start to think like future medical professionals. Classes are
              taught by highschoolers passionate about medicine, with
              professional guest speakers joining throughout the course to
              share their expertise.
            </p>

            <div className="signup-course-credits">
              <span className="signup-credit">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle
                    cx="9"
                    cy="8"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M3 20c0-3 2.7-5 6-5s6 2 6 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="17"
                    cy="9"
                    r="2.5"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M15.5 13.2c2.4.4 4.5 1.9 4.5 4.3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                Audience: Grades 5–8
              </span>

              <span className="signup-credit">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M4 20c0-3.5 3.5-6 8-6s8 2.5 8 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="12"
                    cy="7"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                Curriculum developed by: Sathvik &amp; Amogh
              </span>

              <span className="signup-credit">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 4 2 9l10 5 10-5-10-5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 11v5c0 1.5 2.5 3 6 3s6-1.5 6-3v-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Taught by: Sathvik &amp; Amogh
              </span>
            </div>

            <div className="signup-schedule-box">
              <div className="signup-schedule-heading">
                <div>
                  <span>October–November 2026 schedule</span>
                  <strong>8 total classes</strong>
                </div>

                <span className="signup-online-badge">Online</span>
              </div>

              <div className="signup-schedule-columns">
                <div>
                  <h3>Sundays</h3>

                  <p>12:00 PM–1:00 PM Central Time</p>

                  <span>
                    October 11, 18, and 25
                    <br />
                    November 1, 8, 15, 22, and 29
                  </span>

                  <strong>8 Sunday classes</strong>
                </div>
              </div>
            </div>

            <div className="signup-course-details">
              <div>
                <span>Format</span>
                <strong>Zoom or Google Meet</strong>
              </div>

              <div>
                <span>Cost</span>
                <strong>Completely free</strong>
              </div>

              <div>
                <span>Course length</span>
                <strong>8 classes, October 11–November 29, 2026</strong>
              </div>

              <div>
                <span>Registration</span>
                <strong>Google Form</strong>
              </div>
            </div>

            <a
              className="signup-button"
              href={signupFormLink}
              target="_blank"
              rel="noreferrer"
            >
              Sign Up for Intro to Medicine
            </a>
          </article>

          <article className="signup-course-card signup-featured-course">
            <div className="signup-course-top">
              <div>
                <span className="signup-course-label">
                  October–December 2026 Program
                </span>

                <h2>Intro to Geometry</h2>
              </div>

              <span className="signup-free-badge">Free</span>
            </div>

            <p className="signup-course-description">
              Intro to Geometry introduces students to the foundational
              building blocks of geometry through clear, hands-on lessons.
              Students will explore lines, angles, triangles, circles, area,
              perimeter, 3D shapes, and more, building a strong visual and
              mathematical understanding of shapes and space.
            </p>

            <p className="signup-course-description">
              The course emphasizes problem-solving and real-world
              applications, helping students see how geometric thinking
              connects to everyday life. Students will practice measuring,
              constructing, and reasoning about shapes while building
              confidence tackling geometry problems of increasing
              difficulty.
            </p>

            <div className="signup-course-credits">
              <span className="signup-credit">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle
                    cx="9"
                    cy="8"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M3 20c0-3 2.7-5 6-5s6 2 6 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="17"
                    cy="9"
                    r="2.5"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M15.5 13.2c2.4.4 4.5 1.9 4.5 4.3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                Audience: Grades 5–8
              </span>

              <span className="signup-credit">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M4 20c0-3.5 3.5-6 8-6s8 2.5 8 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="12"
                    cy="7"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                Curriculum developed by: Mukund
              </span>

              <span className="signup-credit">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 4 2 9l10 5 10-5-10-5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 11v5c0 1.5 2.5 3 6 3s6-1.5 6-3v-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Taught by: Mukund
              </span>

              <span className="signup-credit">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                Overseen by: Amogh
              </span>
            </div>

            <div className="signup-schedule-box">
              <div className="signup-schedule-heading">
                <div>
                  <span>October–December 2026 schedule</span>
                  <strong>10 total classes</strong>
                </div>

                <span className="signup-online-badge">Online</span>
              </div>

              <div className="signup-schedule-columns">
                <div>
                  <h3>Fridays</h3>

                  <p>5:00 PM–6:00 PM Central Time</p>

                  <span>
                    October 16, 23, and 30
                    <br />
                    November 6, 13, 20, and 27
                    <br />
                    December 4, 11, and 18
                  </span>

                  <strong>10 Friday classes</strong>
                </div>
              </div>
            </div>

            <div className="signup-course-details">
              <div>
                <span>Format</span>
                <strong>Zoom or Google Meet</strong>
              </div>

              <div>
                <span>Cost</span>
                <strong>Completely free</strong>
              </div>

              <div>
                <span>Course length</span>
                <strong>10 classes, October 16–December 18, 2026</strong>
              </div>

              <div>
                <span>Registration</span>
                <strong>Google Form</strong>
              </div>
            </div>

            <a
              className="signup-button"
              href={signupFormLink}
              target="_blank"
              rel="noreferrer"
            >
              Sign Up for Intro to Geometry
            </a>
          </article>

          <article className="signup-course-card signup-closed-course">
            <div className="signup-course-top">
              <div>
                <span className="signup-course-label signup-closed-label">
                  August 2026 Program
                </span>

                <h2>5th Grade CogAT Bootcamp</h2>
              </div>

              <span className="signup-closed-badge">
                Registration Closed
              </span>
            </div>

            <p className="signup-closed-note">
              This session has already started and registration is closed.
              Sign-ups are no longer being accepted for this course.
            </p>

            <p className="signup-course-description">
              In many Illinois school districts, fifth-grade students take the
              CogAT as part of the process used to determine advanced or
              accelerated middle-school math placement. This bootcamp will help
              students become familiar with quantitative, verbal, and
              nonverbal reasoning questions while developing stronger
              problem-solving strategies.
            </p>

            <p className="signup-course-description">
              Students will practice recognizing patterns, analyzing
              relationships, solving visual puzzles, and applying logical
              reasoning. The goal is to help students understand the different
              question formats and approach the assessment with greater
              confidence.
            </p>

            <div className="signup-course-credits">
              <span className="signup-credit">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M4 20c0-3.5 3.5-6 8-6s8 2.5 8 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="12"
                    cy="7"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                Course developed by: Amogh
              </span>

              <span className="signup-credit">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 4 2 9l10 5 10-5-10-5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 11v5c0 1.5 2.5 3 6 3s6-1.5 6-3v-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Taught by: Amogh
              </span>
            </div>

            <div className="signup-schedule-box signup-schedule-box-closed">
              <div className="signup-schedule-heading">
                <div>
                  <span>August 2026 schedule</span>
                  <strong>9 total classes</strong>
                </div>

                <span className="signup-online-badge">Online</span>
              </div>

              <div className="signup-schedule-columns">
                <div>
                  <h3>Saturdays</h3>

                  <p>10:00 AM–11:30 AM Central Time</p>

                  <span>August 1, 8, 15, 22, and 29</span>

                  <strong>5 Saturday classes</strong>
                </div>

                <div>
                  <h3>Wednesdays</h3>

                  <p>6:00 PM–7:30 PM Central Time</p>

                  <span>August 5, 12, 19, and 26</span>

                  <strong>4 Wednesday classes</strong>
                </div>
              </div>
            </div>

            <div className="signup-course-details">
              <div>
                <span>Format</span>
                <strong>Zoom or Google Meet</strong>
              </div>

              <div>
                <span>Cost</span>
                <strong>Completely free</strong>
              </div>

              <div>
                <span>Course length</span>
                <strong>9 classes during August 2026</strong>
              </div>

              <div>
                <span>Registration</span>
                <strong>Closed</strong>
              </div>
            </div>

            <span className="signup-button signup-button-disabled">
              Sign-Ups Closed
            </span>
          </article>

          <article className="signup-course-card signup-closed-course">
            <div className="signup-course-top">
              <div>
                <span className="signup-course-label signup-closed-label">
                  June–August 2026 Program
                </span>

                <h2>AMC 8 Math Course</h2>
              </div>

              <span className="signup-closed-badge">
                Registration Closed
              </span>
            </div>

            <p className="signup-closed-note">
              This session has already started and registration is closed.
              Sign-ups are no longer being accepted for this course.
            </p>

            <p className="signup-course-description">
              The AMC 8 Math Course is designed for motivated middle-school
              students who want to strengthen their mathematical reasoning and
              prepare for competition-style problems. Students study number
              theory, algebra, geometry, counting, probability, logic, and
              creative problem-solving strategies while practicing questions
              inspired by the AMC 8.
            </p>

            <p className="signup-course-description">
              The course focuses on understanding why strategies work instead
              of simply memorizing formulas. Students learn how to approach
              unfamiliar problems, explain their reasoning, recognize
              patterns, and become more confident when solving challenging
              mathematics questions.
            </p>

            <div className="signup-course-credits">
              <span className="signup-credit">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M4 20c0-3.5 3.5-6 8-6s8 2.5 8 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="12"
                    cy="7"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                Course developed by: Amogh
              </span>

              <span className="signup-credit">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 4 2 9l10 5 10-5-10-5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 11v5c0 1.5 2.5 3 6 3s6-1.5 6-3v-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Taught by: Amogh
              </span>
            </div>

            <div className="signup-schedule-box signup-schedule-box-closed">
              <div className="signup-schedule-heading">
                <div>
                  <span>June–August 2026 schedule</span>
                  <strong>16 total classes</strong>
                </div>

                <span className="signup-online-badge">Online</span>
              </div>

              <div className="signup-schedule-columns">
                <div>
                  <h3>Mondays &amp; Wednesdays</h3>

                  <p>10:30 AM–11:30 AM Central Time</p>

                  <span>
                    June 15, 17, 22, 24, and 29
                    <br />
                    July 1, 6, 8, 13, 15, 20, 22, 27, and 29
                    <br />
                    August 3 and 5
                  </span>

                  <strong>16 classes total</strong>
                </div>
              </div>
            </div>

            <div className="signup-course-details">
              <div>
                <span>Format</span>
                <strong>Zoom or Google Meet</strong>
              </div>

              <div>
                <span>Cost</span>
                <strong>Completely free</strong>
              </div>

              <div>
                <span>Course length</span>
                <strong>16 classes, June 15–August 5, 2026</strong>
              </div>

              <div>
                <span>Registration</span>
                <strong>Closed</strong>
              </div>
            </div>

            <span className="signup-button signup-button-disabled">
              Sign-Ups Closed
            </span>
          </article>
        </div>
      </section>

      <section className="signup-tutoring">
        <div className="signup-tutoring-card">
          <p className="eyebrow">Private tutoring</p>

          <h2>Want a fully personalized math course?</h2>

          <p className="signup-tutoring-description">
            In addition to our free group courses, we offer 1-on-1 private
            tutoring in any type of math. Each course is custom-built around
            your student, with a tailored curriculum and teaching method
            designed specifically for how they learn.
          </p>

          <p className="signup-tutoring-description">
            Email{" "}
            <a href="mailto:kapooramogh10@gmail.com">
              kapooramogh10@gmail.com
            </a>{" "}
            directly to sign up. Rate is $30/hour.
          </p>

          <a
            className="signup-button"
            href="mailto:kapooramogh10@gmail.com"
          >
            Email to Sign Up for Tutoring
          </a>
        </div>
      </section>

      <section className="signup-process">
        <div className="signup-process-heading">
          <p className="eyebrow signup-light-eyebrow">
            How registration works
          </p>

          <h2>Complete one form to request a place in a course.</h2>
        </div>

        <div className="signup-steps">
          <article>
            <span>01</span>

            <h3>Choose a course</h3>

            <p>
              Review the available programs, schedules, and course descriptions
              before selecting the course your student would like to attend.
            </p>
          </article>

          <article>
            <span>02</span>

            <h3>Complete the form</h3>

            <p>
              Provide basic parent, student, scheduling, and course-interest
              information through the registration Google Form.
            </p>
          </article>

          <article>
            <span>03</span>

            <h3>Receive confirmation</h3>

            <p>
              Families will receive enrollment confirmation, course details,
              and the Zoom or Google Meet link before classes begin.
            </p>
          </article>
        </div>

        <a
          className="signup-light-button"
          href={signupFormLink}
          target="_blank"
          rel="noreferrer"
        >
          Open Registration Form
        </a>
      </section>
    </main>
  );
}

export default Signup;
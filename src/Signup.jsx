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
                  September 2026 Program
                </span>

                <h2>IOWA Assessments — 5th Grade Prep Course</h2>
              </div>

              <span className="signup-free-badge">Free</span>
            </div>

            <p className="signup-course-description">
              The IOWA Assessments 5th Grade Prep Course helps students build
              confidence and skill across the full range of the IOWA (Iowa
              Assessments) test. Students will practice reading comprehension,
              vocabulary, language and writing conventions, mathematics, and
              problem solving through timed, test-style questions that mirror
              the real exam format.
            </p>

            <p className="signup-course-description">
              The course emphasizes understanding over memorization. Students
              learn test-taking strategies, how to manage their time, how to
              eliminate wrong answers, and how to approach unfamiliar
              question types calmly and systematically — so they walk into
              test day prepared and confident.
            </p>

            <div className="signup-schedule-box">
              <div className="signup-schedule-heading">
                <div>
                  <span>September 2026 schedule</span>
                  <strong>8 total classes</strong>
                </div>

                <span className="signup-online-badge">
                  Online (via Google Meet)
                </span>
              </div>

              <div className="signup-schedule-columns">
                <div>
                  <h3>Saturdays</h3>

                  <p>9:30 AM–11:00 AM Central Time</p>

                  <span>September 5, 12, 19, and 26</span>

                  <strong>4 Saturday classes</strong>
                </div>

                <div>
                  <h3>Mondays</h3>

                  <p>6:00 PM–7:30 PM Central Time</p>

                  <span>September 7, 14, 21, and 28</span>

                  <strong>4 Monday classes</strong>
                </div>
              </div>
            </div>

            <div className="signup-course-details">
              <div>
                <span>Format</span>
                <strong>Google Meet</strong>
              </div>

              <div>
                <span>Cost</span>
                <strong>Completely free</strong>
              </div>

              <div>
                <span>Course length</span>
                <strong>8 classes during September 2026</strong>
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
              Sign Up for IOWA Assessments Prep
            </a>
          </article>

          <article className="signup-course-card signup-featured-course">
            <div className="signup-course-top">
              <div>
                <span className="signup-course-label">
                  August 2026 Program
                </span>

                <h2>5th Grade CogAT Bootcamp</h2>
              </div>

              <span className="signup-free-badge">Free</span>
            </div>

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

            <div className="signup-schedule-box">
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
                <strong>Google Form</strong>
              </div>
            </div>

            <a
              className="signup-button"
              href={signupFormLink}
              target="_blank"
              rel="noreferrer"
            >
              Sign Up for CogAT Bootcamp
            </a>
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
import { Link } from "react-router";
import "./Resources.css";

function FreeResources() {
  return (
    <main className="resources-page">
      <section className="resources-hero">
        <p className="eyebrow">Free learning tools</p>

        <h1>Practice mathematics through interactive challenges.</h1>

        <p>
          Explore free games and activities designed to strengthen mathematical
          reasoning, pattern recognition, and problem-solving skills.
        </p>
      </section>

      <section className="resources-grid-section">
        <div className="resources-section-heading">
          <div>
            <p className="eyebrow">Interactive resources</p>
            <h2>Choose a resource to begin.</h2>
          </div>

          <p>
            New activities will be added as Summit Math Initiative develops more
            courses and learning materials.
          </p>
        </div>

        <div className="resource-grid">
          <Link
            className="resource-card resource-card-link"
            to="/free-resources/number-theory-sort"
          >
            <div
              className="resource-card-graphic number-theory-graphic"
              aria-hidden="true"
            >
              <div className="mini-number-bank">
                <span>−8</span>
                <span>17</span>
                <span>24</span>
                <span>64</span>
                <span>105</span>
              </div>

              <div className="mini-sort-arrow">↓</div>

              <div className="mini-category-row">
                <div>
                  <strong>Rule A</strong>
                </div>

                <div>
                  <strong>Rule B</strong>
                </div>

                <div>
                  <strong>Rule C</strong>
                </div>
              </div>
            </div>

            <div className="resource-card-content">
              <div className="resource-card-label-row">
                <span className="resource-type-badge">
                  Interactive game
                </span>

                <span className="resource-arrow">→</span>
              </div>

              <h3>Number Theory Sort</h3>

              <p>
                Sort ten numbers using category rules that change every round.
                Topics include primes, composites, factors, multiples, signs,
                perfect squares, perfect cubes, and divisibility.
              </p>

              <div className="resource-card-details">
                <span>14 rule presets</span>
                <span>Randomized rounds</span>
                <span>Grades 5+</span>
              </div>
            </div>
          </Link>

          <Link
            className="resource-card resource-card-link"
            to="/free-resources/shape-patterns"
          >
            <div
              className="resource-card-graphic shape-patterns-graphic"
              aria-hidden="true"
            >
              <div className="mini-matrix-grid">
                <span className="mini-matrix-cell" />
                <span className="mini-matrix-cell mini-matrix-cell-alt" />
                <span className="mini-matrix-cell mini-matrix-cell-alt" />
                <span className="mini-matrix-cell mini-matrix-cell-question">?</span>
              </div>
            </div>

            <div className="resource-card-content">
              <div className="resource-card-label-row">
                <span className="resource-type-badge">
                  Interactive game
                </span>

                <span className="resource-arrow">→</span>
              </div>

              <h3>Shape Patterns</h3>

              <p>
                Practice figure matrices, figure classification, and paper folding puzzles
                like those on gifted-and-talented admissions tests.
              </p>

              <div className="resource-card-details">
                <span>3 puzzle types</span>
                <span>Randomized rounds</span>
                <span>Grades 3+</span>
              </div>
            </div>
          </Link>

          <Link
            className="resource-card resource-card-link"
            to="/free-resources/fraction-decimal-percent-sort"
          >
            <div
              className="resource-card-graphic fraction-sort-graphic"
              aria-hidden="true"
            >
              <div className="mini-number-bank">
                <span>3/4</span>
                <span>0.6</span>
                <span>50%</span>
                <span>1/4</span>
                <span>0.9</span>
              </div>

              <div className="mini-sort-arrow">↓</div>

              <div className="mini-category-row">
                <div>
                  <strong>Rule A</strong>
                </div>

                <div>
                  <strong>Rule B</strong>
                </div>

                <div>
                  <strong>Rule C</strong>
                </div>
              </div>
            </div>

            <div className="resource-card-content">
              <div className="resource-card-label-row">
                <span className="resource-type-badge">
                  Interactive game
                </span>

                <span className="resource-arrow">→</span>
              </div>

              <h3>Fractions, Decimals & Percents Sort</h3>

              <p>
                Sort ten values using category rules that change every round.
                Topics include equivalence, comparison to one half, one
                quarter, three quarters, one third, and one, and terminating
                versus repeating decimals.
              </p>

              <div className="resource-card-details">
                <span>7 rule presets</span>
                <span>Randomized rounds</span>
                <span>Grades 4-6</span>
              </div>
            </div>
          </Link>

          <Link
            className="resource-card resource-card-link"
            to="/free-resources/algebra-balance"
          >
            <div
              className="resource-card-graphic algebra-balance-graphic"
              aria-hidden="true"
            >
              <p className="mini-equation">3x + 4 = 19</p>

              <div className="mini-sort-arrow">↓</div>

              <p className="mini-equation">x = 5</p>
            </div>

            <div className="resource-card-content">
              <div className="resource-card-label-row">
                <span className="resource-type-badge">
                  Interactive game
                </span>

                <span className="resource-arrow">→</span>
              </div>

              <h3>Algebra Equation Balance</h3>

              <p>
                Apply the same operation to both sides of the equation to
                isolate x. Choose Easy, Medium, or Hard equations — including
                variables on both sides and parentheses to distribute — and
                watch the balance simplify with every legal move.
              </p>

              <div className="resource-card-details">
                <span>3 difficulty levels</span>
                <span>Randomized rounds</span>
                <span>Grades 5-8</span>
              </div>
            </div>
          </Link>

          <Link
            className="resource-card resource-card-link"
            to="/free-resources/triangle-properties"
          >
            <div
              className="resource-card-graphic triangle-properties-graphic"
              aria-hidden="true"
            >
              <svg
                className="mini-triangle-icon"
                viewBox="0 0 120 100"
                aria-hidden="true"
              >
                <polygon points="10,90 110,90 10,10" />
                <polyline
                  className="mini-triangle-right-angle"
                  points="10,72 28,72 28,90"
                />
              </svg>
            </div>

            <div className="resource-card-content">
              <div className="resource-card-label-row">
                <span className="resource-type-badge">
                  Interactive game
                </span>

                <span className="resource-arrow">→</span>
              </div>

              <h3>Triangle Properties Explorer</h3>

              <p>
                Identify triangles by their angles, sides, the triangle
                inequality, and side-angle relationships, then find missing
                values using the angle sum rule, the exterior angle theorem,
                the Pythagorean theorem, and the area formula.
              </p>

              <div className="resource-card-details">
                <span>8 question types</span>
                <span>Randomized rounds</span>
                <span>Grades 5-8</span>
              </div>
            </div>
          </Link>

          <article className="resource-card coming-soon-resource">
            <div className="coming-soon-graphic" aria-hidden="true">
              <span>＋</span>
            </div>

            <div className="resource-card-content">
              <div className="resource-card-label-row">
                <span className="coming-soon-badge">
                  Coming soon
                </span>
              </div>

              <h3>More Free Resources</h3>

              <p>
                Additional word-problem and problem-solving activities will
                be added here.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="resources-purpose-section">
        <div>
          <p className="eyebrow light-eyebrow">
            Why free resources?
          </p>

          <h2>
            Practice tools should be available to every motivated student.
          </h2>
        </div>

        <p>
          These activities are designed to give students meaningful practice
          without requiring paid subscriptions, tutoring programs, or expensive
          preparation materials.
        </p>
      </section>
    </main>
  );
}

export default FreeResources;
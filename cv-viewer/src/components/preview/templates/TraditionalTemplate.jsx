import { useCV } from "../../../context/CVContext";

const Section = ({ title, children }) => (
  <div className="mb-3">
    <h2 className="text-xs font-bold uppercase text-gray-900 border-b border-gray-900 pb-0.5 mb-2">
      {title}
    </h2>
    {children}
  </div>
);

export const TraditionalTemplate = () => {
  const { cvData } = useCV();
  const {
    personal,
    summary,
    experience,
    education,
    projects,
    skills,
    certifications,
    languages,
    achievements,
  } = cvData;

  return (
    <>
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-900">
          {`${personal.firstName} ${personal.lastName}`.trim() || "Your Name"}
        </h1>
        <div className="flex flex-wrap justify-center gap-x-1 gap-y-1 mt-1 text-xs text-gray-600">
          {[
            personal.location,
            personal.phone,
            personal.email,
            personal.linkedin,
          ]
            .filter(Boolean)
            .map((val, i, arr) => (
              <span key={i}>
                {val}
                {i < arr.length - 1 && (
                  <span className="mx-1 text-gray-300">|</span>
                )}
              </span>
            ))}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <Section title="Objective">
          <p className="text-xs text-gray-700 leading-relaxed">{summary}</p>
        </Section>
      )}

      {/* Education */}
      {education.some((e) => e.degree || e.institution) && (
        <Section title="Education">
          {education.map((edu, i) => (
            <div key={i} className="mb-1.5">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="text-xs font-bold text-gray-900">
                    {edu.degree}
                  </span>
                  {edu.institution && (
                    <span className="text-xs text-gray-700">
                      , {edu.institution}
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-500 shrink-0 ml-2">
                  {edu.from}
                  {edu.to ? ` – ${edu.to}` : ""}
                </span>
              </div>
              {edu.location && (
                <p className="text-xs text-gray-500 italic">{edu.location}</p>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* Skills */}
      {skills.some((s) => s.category || s.items) && (
        <Section title="Skills">
          <div className="flex flex-col gap-0.5">
            {skills.map((sk, i) =>
              sk.category || sk.items ? (
                <div key={i} className="text-xs text-gray-700">
                  <span className="font-bold text-gray-900">
                    {sk.category}:
                  </span>{" "}
                  <span>{sk.items}</span>
                </div>
              ) : null,
            )}
          </div>
        </Section>
      )}

      {/* Experience */}
      {experience.some((e) => e.title || e.company) && (
        <Section title="Experience">
          {experience.map((exp, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-bold text-gray-900">
                  {exp.title}
                </span>
                {exp.company && (
                  <span className="text-xs text-gray-600 shrink-0 ml-2">
                    {exp.company}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 italic mb-1">
                {exp.from}
                {exp.to ? ` – ${exp.to}` : ""}
              </p>
              {exp.bullets.filter(Boolean).length > 0 && (
                <ul className="flex flex-col gap-0.5">
                  {exp.bullets.filter(Boolean).map((b, bi) => (
                    <li key={bi} className="text-xs text-gray-700 flex gap-1.5">
                      <span className="shrink-0 mt-0.5">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* Achievements */}
      {achievements.some((a) => a.title) && (
        <Section title="Achievements">
          {achievements.map((ach, i) =>
            ach.title ? (
              <div key={i} className="mb-2">
                <span className="text-xs font-bold text-gray-900">
                  {ach.title}
                </span>
                {ach.bullets.filter(Boolean).length > 0 && (
                  <ul className="mt-0.5 flex flex-col gap-0.5">
                    {ach.bullets.filter(Boolean).map((b, bi) => (
                      <li
                        key={bi}
                        className="text-xs text-gray-700 flex gap-1.5"
                      >
                        <span className="shrink-0 mt-0.5">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : null,
          )}
        </Section>
      )}

      {/* Certifications */}
      {certifications.filter(Boolean).length > 0 && (
        <Section title="Certifications">
          <ul className="flex flex-col gap-0.5">
            {certifications.filter(Boolean).map((cert, i) => (
              <li key={i} className="text-xs text-gray-700 flex gap-1.5">
                <span className="shrink-0 mt-0.5">•</span>
                <span>{cert}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Languages */}
      {languages.some((l) => l.language) && (
        <Section title="Languages">
          <p className="text-xs text-gray-700">
            {languages
              .filter((l) => l.language)
              .map((lang, i) => (
                <span key={i}>
                  <span className="font-bold">{lang.language}</span>
                  {lang.proficiency && ` – ${lang.proficiency}`}
                  {i < languages.filter((l) => l.language).length - 1 &&
                    "   |   "}
                </span>
              ))}
          </p>
        </Section>
      )}
    </>
  );
};

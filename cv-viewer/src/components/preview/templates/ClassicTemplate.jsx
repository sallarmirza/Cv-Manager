import { useCV } from "../../../context/CVContext";

const Section = ({ title, children }) => (
  <div className="mb-4">
    <h2 className="text-xs font-bold uppercase tracking-widest text-gray-700 border-b border-gray-400 pb-0.5 mb-2">
      {title}
    </h2>
    {children}
  </div>
);

export const ClassicTemplate = () => {
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
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold uppercase tracking-wide text-gray-900">
          {`${personal.firstName} ${personal.lastName}`.trim() || "Your Name"}
        </h1>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-1 text-xs text-gray-600">
          {personal.location && <span>{personal.location}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.email && <span>{personal.email}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <Section title="Professional Summary">
          <p className="text-xs text-gray-700 leading-relaxed">{summary}</p>
        </Section>
      )}

      {/* Experience */}
      {experience.some((e) => e.title || e.company) && (
        <Section title="Professional Experience">
          {experience.map((exp, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold text-gray-800">
                    {exp.title}
                  </span>
                  {exp.company && (
                    <span className="text-xs text-gray-600">
                      {" "}
                      — {exp.company}
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-500 shrink-0 ml-2">
                  {exp.from}
                  {exp.to ? ` – ${exp.to}` : ""}
                </span>
              </div>
              {exp.location && (
                <p className="text-xs text-gray-500 italic">{exp.location}</p>
              )}
              {exp.bullets.filter(Boolean).length > 0 && (
                <ul className="mt-1 flex flex-col gap-0.5">
                  {exp.bullets.filter(Boolean).map((b, bi) => (
                    <li key={bi} className="text-xs text-gray-700 flex gap-1.5">
                      <span className="mt-0.5 shrink-0">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* Education */}
      {education.some((e) => e.degree || e.institution) && (
        <Section title="Education">
          {education.map((edu, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold text-gray-800">
                    {edu.degree}
                  </span>
                  {edu.institution && (
                    <span className="text-xs text-gray-600">
                      {" "}
                      — {edu.institution}
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

      {/* Projects */}
      {projects.some((p) => p.title) && (
        <Section title="Key Projects">
          {projects.map((proj, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-gray-800">
                  {proj.title}
                </span>
                {proj.year && (
                  <span className="text-xs text-gray-500 shrink-0 ml-2">
                    {proj.year}
                  </span>
                )}
              </div>
              {proj.bullets.filter(Boolean).length > 0 && (
                <ul className="mt-1 flex flex-col gap-0.5">
                  {proj.bullets.filter(Boolean).map((b, bi) => (
                    <li key={bi} className="text-xs text-gray-700 flex gap-1.5">
                      <span className="mt-0.5 shrink-0">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* Skills */}
      {skills.some((s) => s.category || s.items) && (
        <Section title="Technical Skills">
          <div className="flex flex-col gap-1">
            {skills.map((sk, i) =>
              sk.category || sk.items ? (
                <div key={i} className="flex gap-1 text-xs">
                  <span className="font-bold text-gray-800 shrink-0">
                    {sk.category}:
                  </span>
                  <span className="text-gray-700">{sk.items}</span>
                </div>
              ) : null,
            )}
          </div>
        </Section>
      )}

      {/* Certifications */}
      {certifications.filter(Boolean).length > 0 && (
        <Section title="Certifications">
          <ul className="flex flex-col gap-0.5">
            {certifications.filter(Boolean).map((cert, i) => (
              <li key={i} className="text-xs text-gray-700 flex gap-1.5">
                <span className="mt-0.5 shrink-0">•</span>
                <span>{cert}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Languages */}
      {languages.some((l) => l.language) && (
        <Section title="Languages">
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            {languages
              .filter((l) => l.language)
              .map((lang, i) => (
                <div key={i} className="text-xs text-gray-700">
                  <span className="font-bold">{lang.language}</span>
                  {lang.proficiency && (
                    <span className="text-gray-500"> — {lang.proficiency}</span>
                  )}
                </div>
              ))}
          </div>
        </Section>
      )}

      {/* Achievements */}
      {achievements.some((a) => a.title) && (
        <Section title="Achievements & Activities">
          {achievements.map((ach, i) =>
            ach.title ? (
              <div key={i} className="mb-3">
                <span className="text-xs font-bold text-gray-800">
                  {ach.title}
                </span>
                {ach.bullets.filter(Boolean).length > 0 && (
                  <ul className="mt-1 flex flex-col gap-0.5">
                    {ach.bullets.filter(Boolean).map((b, bi) => (
                      <li
                        key={bi}
                        className="text-xs text-gray-700 flex gap-1.5"
                      >
                        <span className="mt-0.5 shrink-0">•</span>
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
    </>
  );
};

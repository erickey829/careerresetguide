"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Layout,
  Zap,
  FileDown,
} from "lucide-react";

function Input({
  label,
  field,
  placeholder,
  type = "text",
  formData,
  updateField,
}: {
  label: string;
  field: string;
  placeholder?: string;
  type?: string;
  formData: Record<string, string | string[]>;
  updateField: (field: string, value: string) => void;
}) {
  return (
    <div className="mb-6">
      <label className="block font-medium mb-1 text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        value={(formData[field] as string) || ""}
        onChange={(e) => updateField(field, e.target.value)}
        placeholder={placeholder}
        className="w-full bg-card border border-border rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none transition-all"
      />
    </div>
  );
}

function TextArea({
  label,
  field,
  placeholder,
  rows = 3,
  formData,
  updateField,
}: {
  label: string;
  field: string;
  placeholder?: string;
  rows?: number;
  formData: Record<string, string | string[]>;
  updateField: (field: string, value: string) => void;
}) {
  return (
    <div className="mb-6">
      <label className="block font-medium mb-1 text-muted-foreground">
        {label}
      </label>
      <textarea
        rows={rows}
        value={(formData[field] as string) || ""}
        onChange={(e) => updateField(field, e.target.value)}
        placeholder={placeholder}
        className="w-full bg-card border border-border rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none transition-all"
      />
    </div>
  );
}

export default function CareerResetGuide() {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState<Record<string, string | string[]>>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const totalPages = 10;

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleValue = (field: string, value: string) => {
    const currentValues = (formData[field] as string[]) || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    setFormData((prev) => ({ ...prev, [field]: newValues }));
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/10">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-secondary z-50">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${(currentPage / totalPages) * 100}%` }}
        />
      </div>

      <main className="max-w-2xl mx-auto px-6 py-20 min-h-screen flex flex-col justify-center">
        {/* Page 1 - Welcome */}
        {currentPage === 1 && (
          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mb-8 flex justify-center">
              <div className="p-4 bg-primary rounded-3xl shadow-xl shadow-primary/20">
                <Layout className="w-12 h-12 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-serif mb-6 tracking-tight text-balance">
              The First Step
            </h1>
            <p className="text-xl text-muted-foreground font-light leading-relaxed mb-12 text-pretty">
              A simple starting point for people who know they don&apos;t want
              to keep doing what they&apos;re doing — but don&apos;t know
              what&apos;s next.
            </p>
            <button
              onClick={nextPage}
              className="px-10 py-5 bg-foreground text-background rounded-full font-bold text-lg hover:opacity-90 transition-all transform hover:scale-105 shadow-xl"
            >
              Begin the Reflection
            </button>
          </div>
        )}

        {/* Page 2 - Orientation */}
        {currentPage === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4">
            <h2 className="text-4xl font-serif font-bold mb-8">Orientation</h2>
            <div className="space-y-6 text-lg text-muted-foreground border-l-4 border-primary pl-8 py-4 bg-card rounded-r-xl shadow-sm">
              <p>
                Before we start, let&apos;s lower the stakes. To find your next
                move:
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-primary w-5 h-5 shrink-0" />
                  You don&apos;t need a new career yet.
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-primary w-5 h-5 shrink-0" />
                  You don&apos;t need to find your &quot;passion.&quot;
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-primary w-5 h-5 shrink-0" />
                  You don&apos;t need to quit your job today.
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Page 3 - What's Draining You */}
        {currentPage === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4">
            <h2 className="text-4xl font-serif font-bold mb-4">
              What&apos;s Actually Draining You?
            </h2>
            <p className="text-muted-foreground mb-8 italic">
              Let&apos;s isolate the noise. Be honest—nobody is reading this but
              you.
            </p>
            <TextArea
              label="The top 3 things that exhaust me at work:"
              field="exhausting_things"
              placeholder="1. Meetings that could be emails..."
              formData={formData}
              updateField={updateField}
            />
            <Input
              label="The part of my job I avoid the most:"
              field="avoid_task"
              placeholder="Managing budget spreadsheets..."
              formData={formData}
              updateField={updateField}
            />
            <Input
              label="The sentence I find myself repeating about work:"
              field="repeated_sentence"
              placeholder='"I just need to make it to Friday."'
              formData={formData}
              updateField={updateField}
            />
          </div>
        )}

        {/* Page 4 - Values */}
        {currentPage === 4 && (
          <div className="animate-in fade-in slide-in-from-right-4">
            <h2 className="text-4xl font-serif font-bold mb-4">
              What You Want More Of
            </h2>
            <p className="text-muted-foreground mb-8">
              Circle the values that feel non-negotiable for your next chapter.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                "Autonomy",
                "Creativity",
                "Stability",
                "Deep Focus",
                "Collaboration",
                "Prestige",
                "Helping Others",
                "Learning",
              ].map((val) => (
                <button
                  key={val}
                  onClick={() => toggleValue("values", val)}
                  className={`px-4 py-2 rounded-full border transition-all ${
                    ((formData.values as string[]) || []).includes(val)
                      ? "bg-primary border-primary text-primary-foreground shadow-md"
                      : "bg-card border-border text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="More..."
                field="more_of"
                placeholder="Ownership"
                formData={formData}
                updateField={updateField}
              />
              <Input
                label="Less..."
                field="less_of"
                placeholder="Fire-drills"
                formData={formData}
                updateField={updateField}
              />
            </div>
          </div>
        )}

        {/* Page 5 - Skills Inventory */}
        {currentPage === 5 && (
          <div className="animate-in fade-in slide-in-from-right-4">
            <h2 className="text-4xl font-serif font-bold mb-4">
              You&apos;re Not Starting From Zero
            </h2>
            <p className="text-muted-foreground mb-8">
              We often devalue what comes easily to us. Let&apos;s inventory
              your existing capital.
            </p>
            <TextArea
              label="Things I know how to do that I've done for years:"
              field="long_term_skills"
              formData={formData}
              updateField={updateField}
            />
            <Input
              label='Skills people underestimate because they are "normal" to me:'
              field="hidden_skills"
              placeholder="e.g. Synthesizing complex data"
              formData={formData}
              updateField={updateField}
            />
            <Input
              label="People already trust me with:"
              field="trusted_with"
              placeholder="e.g. Navigating difficult internal politics"
              formData={formData}
              updateField={updateField}
            />
          </div>
        )}

        {/* Page 6 - Directions */}
        {currentPage === 6 && (
          <div className="animate-in fade-in slide-in-from-right-4">
            <h2 className="text-4xl font-serif font-bold mb-8">
              4 Directions Worth Exploring
            </h2>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {[
                {
                  t: "Same Skill, New Scene",
                  d: "Mission-aligned companies.",
                },
                { t: "Adjacent Skill", d: "Transition to a related role." },
                { t: "Reduced Scope", d: "Step back to regain time." },
                {
                  t: "The Hybrid Path",
                  d: "Consulting or piloting a new industry.",
                },
              ].map((dir, i) => (
                <div
                  key={i}
                  className="p-4 border border-border rounded-xl bg-card shadow-sm"
                >
                  <h3 className="font-bold text-primary">
                    {i + 1}. {dir.t}
                  </h3>
                  <p className="text-sm text-muted-foreground">{dir.d}</p>
                </div>
              ))}
            </div>
            <Input
              label="Which 2 feel worth learning more about?"
              field="top_directions"
              placeholder="e.g. 1 and 4"
              formData={formData}
              updateField={updateField}
            />
          </div>
        )}

        {/* Page 7 - Next Steps */}
        {currentPage === 7 && (
          <div className="animate-in fade-in slide-in-from-right-4">
            <h2 className="text-4xl font-serif font-bold mb-4">
              Low-Risk Next Steps
            </h2>
            <p className="text-muted-foreground mb-8">
              Action kills anxiety. Choose one small thing you can do this week.
            </p>
            <Input
              label="One Conversation:"
              field="next_convo"
              placeholder="Ask [Name] about their role..."
              formData={formData}
              updateField={updateField}
            />
            <Input
              label="One Research Task:"
              field="next_research"
              placeholder="Look up salary averages for..."
              formData={formData}
              updateField={updateField}
            />
            <div className="mt-8 p-4 bg-foreground text-background rounded-xl flex items-center gap-4">
              <Zap className="text-primary w-8 h-8 shrink-0" />
              <p className="text-sm">
                &quot;None of these require quitting. They are just data
                points.&quot;
              </p>
            </div>
          </div>
        )}

        {/* Page 8 - Review */}
        {currentPage === 8 && (
          <div className="animate-in fade-in slide-in-from-right-4">
            <h2 className="text-4xl font-serif font-bold mb-4">
              Where You Are Now
            </h2>
            <p className="text-muted-foreground mb-8">
              Review your entries. What&apos;s standing out?
            </p>
            <TextArea
              label="After reviewing my answers, what I'm clearer on now:"
              field="final_clarity"
              formData={formData}
              updateField={updateField}
            />
            <TextArea
              label="As I finish this workbook, what feels lighter in my mind:"
              field="lighter_mind"
              formData={formData}
              updateField={updateField}
            />
          </div>
        )}

        {/* Page 9 - Encouragement */}
        {currentPage === 9 && (
          <div className="animate-in fade-in slide-in-from-right-4 text-center">
            <div className="max-w-md mx-auto">
              <h2 className="text-4xl font-serif font-bold mb-6">
                Why This Still Feels Hard
              </h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Career changes are{" "}
                  <strong className="text-foreground">identity shifts</strong>.
                  Fear is just your brain trying to keep you safe.
                </p>
                <p className="font-semibold text-foreground mt-8 italic">
                  Clarity usually comes in stages — not all at once.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Page 10 - Email Capture */}
        {currentPage === 10 && (
          <div className="animate-in zoom-in-95 duration-500">
            <div className="bg-card border-2 border-primary/10 p-8 md:p-12 rounded-3xl shadow-2xl shadow-primary/5 text-center">
              {!isSubmitted ? (
                <>
                  <div className="mb-6 inline-flex p-4 bg-primary/10 rounded-full">
                    <FileDown className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-4xl font-serif font-bold mb-4">
                    Your Next Chapter Starts Here
                  </h2>
                  <p className="text-muted-foreground mb-8 max-w-sm mx-auto leading-relaxed">
                    Enter your email to receive your{" "}
                    <strong>customized summary</strong> based on your responses.
                  </p>
                  <form
                    onSubmit={handleFinalSubmit}
                    className="max-w-md mx-auto space-y-4"
                  >
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={(formData.email as string) || ""}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="w-full bg-secondary border border-border rounded-xl p-4 text-center text-lg focus:ring-2 focus:ring-primary outline-none"
                    />
                    <button
                      disabled={isSubmitting}
                      className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting
                        ? "Compiling..."
                        : "Compile & Email My Summary"}
                      {!isSubmitting && <ChevronRight className="w-5 h-5" />}
                    </button>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-6">
                      By submitting your email address, you&apos;ll receive your
                      workbook summary and provide consent to join my mailing
                      list. Unsubscribe anytime.
                    </p>
                  </form>
                </>
              ) : (
                <div className="py-12">
                  <div className="mb-6 inline-flex p-4 bg-green-50 rounded-full">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                  </div>
                  <h2 className="text-3xl font-serif font-bold mb-2">
                    Check Your Inbox!
                  </h2>
                  <p className="text-muted-foreground">
                    Your transition roadmap is on its way.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Navigation Dock */}
      {currentPage > 1 && (
        <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-card/80 backdrop-blur-md border border-border p-2 px-4 rounded-full flex items-center gap-6 shadow-2xl z-40">
          <button
            onClick={prevPage}
            className="p-2 hover:bg-secondary rounded-full text-muted-foreground hover:text-primary transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft />
          </button>
          <div className="text-sm font-bold text-muted-foreground tabular-nums uppercase tracking-widest">
            {currentPage === 10 ? (
              <span className="text-primary">Go back to workbook</span>
            ) : (
              <>
                {"Page "}
                <span className="text-primary">{currentPage}</span>
                {" of "}
                {totalPages}
              </>
            )}
          </div>
          {currentPage < totalPages ? (
            <button
              onClick={nextPage}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-full font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/10"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="w-[40px]" />
          )}
        </nav>
      )}
    </div>
  );
}

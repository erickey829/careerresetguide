import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Send, CheckCircle2, Layout, Zap, FileDown, Search, MessageSquare, Users } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const totalPages = 10;

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleValue = (field, value) => {
    const currentValues = formData[field] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    updateField(field, newValues);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!formData.email) return;
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // Shared Components
  const Input = ({ label, field, placeholder, type = "text" }) => (
    <div className="mb-6">
      <label className="block font-medium mb-1 text-slate-700">{label}</label>
      <input 
        type={type}
        value={formData[field] || ''}
        onChange={(e) => updateField(field, e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
      />
    </div>
  );

  const TextArea = ({ label, field, placeholder, rows = 3 }) => (
    <div className="mb-6">
      <label className="block font-medium mb-1 text-slate-700">{label}</label>
      <textarea 
        rows={rows}
        value={formData[field] || ''}
        onChange={(e) => updateField(field, e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      <div className="fixed top-0 left-0 w-full h-1.5 bg-slate-200 z-50">
        <div 
          className="h-full bg-indigo-500 transition-all duration-500 ease-out" 
          style={{ width: `${(currentPage / totalPages) * 100}%` }}
        ></div>
      </div>

      <main className="max-w-2xl mx-auto px-6 py-20 min-h-screen flex flex-col justify-center">
        
        {currentPage === 1 && (
          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mb-8 flex justify-center">
              <div className="p-4 bg-indigo-600 rounded-3xl shadow-xl shadow-indigo-200">
                <Layout className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-serif mb-6 tracking-tight">The First Step</h1>
            <p className="text-xl text-slate-500 font-light leading-relaxed mb-12">
              A simple starting point for people who know they don’t want to keep doing what they’re doing — but don’t know what’s next.
            </p>
            <button onClick={nextPage} className="px-10 py-5 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-slate-800 transition-all transform hover:scale-105 shadow-xl">
              Begin the Reflection
            </button>
          </div>
        )}

        {currentPage === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4">
            <h2 className="text-4xl font-serif font-bold mb-8">Orientation</h2>
            <div className="space-y-6 text-lg text-slate-600 border-l-4 border-indigo-500 pl-8 py-4 bg-white rounded-r-xl shadow-sm">
              <p>Before we start, let’s lower the stakes. To find your next move:</p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3"><CheckCircle2 className="text-indigo-500 w-5 h-5" /> You don’t need a new career yet.</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-indigo-500 w-5 h-5" /> You don’t need to find your "passion."</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-indigo-500 w-5 h-5" /> You don’t need to quit your job today.</li>
              </ul>
            </div>
          </div>
        )}

        {currentPage === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4">
            <h2 className="text-4xl font-serif font-bold mb-4">What’s Actually Draining You?</h2>
            <p className="text-slate-500 mb-8 italic">Let's isolate the noise. Be honest—nobody is reading this but you.</p>
            <TextArea label="The top 3 things that exhaust me at work:" field="exhausting_things" placeholder="1. Meetings that could be emails..." />
            <Input label="The part of my job I avoid the most:" field="avoid_task" placeholder="Managing budget spreadsheets..." />
            <Input label="The sentence I find myself repeating about work:" field="repeated_sentence" placeholder='"I just need to make it to Friday."' />
          </div>
        )}

        {currentPage === 4 && (
          <div className="animate-in fade-in slide-in-from-right-4">
            <h2 className="text-4xl font-serif font-bold mb-4">What You Want More Of</h2>
            <p className="text-slate-500 mb-8">Circle the values that feel non-negotiable for your next chapter.</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {['Autonomy', 'Creativity', 'Stability', 'Deep Focus', 'Collaboration', 'Prestige', 'Helping Others', 'Learning'].map(val => (
                <button 
                  key={val}
                  onClick={() => toggleValue('values', val)}
                  className={`px-4 py-2 rounded-full border transition-all ${
                    (formData.values || []).includes(val) 
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="More..." field="more_of" placeholder="Ownership" />
              <Input label="Less..." field="less_of" placeholder="Fire-drills" />
            </div>
          </div>
        )}

        {currentPage === 5 && (
          <div className="animate-in fade-in slide-in-from-right-4">
            <h2 className="text-4xl font-serif font-bold mb-4">You’re Not Starting From Zero</h2>
            <p className="text-slate-500 mb-8">We often devalue what comes easily to us. Let’s inventory your existing capital.</p>
            <TextArea label="Things I know how to do that I’ve done for years:" field="long_term_skills" />
            <Input label="Skills people underestimate because they’re “normal” to me:" field="hidden_skills" placeholder="e.g. Synthesizing complex data" />
            <Input label="People already trust me with:" field="trusted_with" placeholder="e.g. Navigating difficult internal politics" />
          </div>
        )}

        {currentPage === 6 && (
          <div className="animate-in fade-in slide-in-from-right-4">
            <h2 className="text-4xl font-serif font-bold mb-8">4 Directions Worth Exploring</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {[
                { t: "Same Skill, New Scene", d: "Mission-aligned companies." },
                { t: "Adjacent Skill", d: "Transition to a related role." },
                { t: "Reduced Scope", d: "Step back to regain time." },
                { t: "The Hybrid Path", d: "Consulting or piloting a new industry." }
              ].map((dir, i) => (
                <div key={i} className="p-4 border border-slate-200 rounded-xl bg-white shadow-sm">
                  <h3 className="font-bold text-indigo-600">{i+1}. {dir.t}</h3>
                  <p className="text-sm text-slate-500">{dir.d}</p>
                </div>
              ))}
            </div>
            <Input label="Which 2 feel worth learning more about?" field="top_directions" placeholder="e.g. 1 and 4" />
          </div>
        )}

        {currentPage === 7 && (
          <div className="animate-in fade-in slide-in-from-right-4">
            <h2 className="text-4xl font-serif font-bold mb-4">Low-Risk Next Steps</h2>
            <p className="text-slate-500 mb-8">Action kills anxiety. Choose one small thing you can do this week.</p>
            <Input label="One Conversation:" field="next_convo" placeholder="Ask [Name] about their role..." />
            <Input label="One Research Task:" field="next_research" placeholder="Look up salary averages for..." />
            <div className="mt-8 p-4 bg-slate-900 text-white rounded-xl flex items-center gap-4">
              <Zap className="text-indigo-400 w-8 h-8" />
              <p className="text-sm">“None of these require quitting. They are just data points.”</p>
            </div>
          </div>
        )}

        {currentPage === 8 && (
          <div className="animate-in fade-in slide-in-from-right-4">
            <h2 className="text-4xl font-serif font-bold mb-4">Where You Are Now</h2>
            <p className="text-slate-500 mb-8">Review your entries. What's standing out?</p>
            <TextArea label="After reviewing my answers, what I’m clearer on now:" field="final_clarity" />
            <TextArea label="As I finish this workbook, what feels lighter in my mind:" field="lighter_mind" />
          </div>
        )}

        {currentPage === 9 && (
          <div className="animate-in fade-in slide-in-from-right-4 text-center">
            <div className="max-w-md mx-auto">
              <h2 className="text-4xl font-serif font-bold mb-6">Why This Still Feels Hard</h2>
              <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                <p>Career changes are <strong>identity shifts</strong>. Fear is just your brain trying to keep you safe.</p>
                <p className="font-semibold text-slate-900 mt-8 italic">Clarity usually comes in stages — not all at once.</p>
              </div>
            </div>
          </div>
        )}

        {currentPage === 10 && (
          <div className="animate-in zoom-in-95 duration-500">
            <div className="bg-white border-2 border-indigo-100 p-8 md:p-12 rounded-3xl shadow-2xl shadow-indigo-100/50 text-center">
              {!isSubmitted ? (
                <>
                  <div className="mb-6 inline-flex p-4 bg-indigo-50 rounded-full">
                    <FileDown className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h2 className="text-4xl font-serif font-bold mb-4">Your Next Chapter Starts Here</h2>
                  <p className="text-slate-500 mb-8 max-w-sm mx-auto leading-relaxed">
                    Enter your email to receive your <strong>customized summary</strong> based on your responses.
                  </p>
                  <form onSubmit={handleFinalSubmit} className="max-w-md mx-auto space-y-4">
                    <input 
                      type="email" required placeholder="your@email.com"
                      value={formData.email || ''}
                      onChange={(e) => updateField('email', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-center text-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    <button 
                      disabled={isSubmitting}
                      className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? "Compiling..." : "Compile & Email My Summary"}
                      {!isSubmitting && <ChevronRight className="w-5 h-5" />}
                    </button>
                    <p className="text-sm text-slate-500 leading-relaxed mt-6">
                      By submitting your email address, you'll receive your workbook summary and provide consent to join my mailing list. Unsubscribe anytime.
                    </p>
                  </form>
                </>
              ) : (
                <div className="py-12">
                  <div className="mb-6 inline-flex p-4 bg-green-50 rounded-full">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                  </div>
                  <h2 className="text-3xl font-serif font-bold mb-2">Check Your Inbox!</h2>
                  <p className="text-slate-500">Your transition roadmap is on its way.</p>
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      {/* Navigation Dock */}
      {currentPage > 1 && (
        <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md border border-slate-200 p-2 px-4 rounded-full flex items-center gap-6 shadow-2xl z-40">
          <button onClick={prevPage} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-indigo-600 transition-colors">
            <ChevronLeft />
          </button>
          <div className="text-sm font-bold text-slate-400 tabular-nums uppercase tracking-widest">
            {currentPage === 10 ? (
              <span className="text-indigo-600">Go back to workbook</span>
            ) : (
              <>Page <span className="text-indigo-600">{currentPage}</span> of {totalPages}</>
            )}
          </div>
          {currentPage < totalPages ? (
            <button onClick={nextPage} className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-full font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
              Next <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="w-[40px]"></div>
          )}
        </nav>
      )}
    </div>
  );
}

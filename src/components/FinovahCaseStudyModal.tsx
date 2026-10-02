import React, { useState } from 'react';
import { X, Calculator, ArrowRight, CheckCircle2, TrendingUp, DollarSign, PieChart, Shield } from 'lucide-react';
import { FINOVAH_CASE_STUDY } from '../data/projects';

interface FinovahCaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FinovahCaseStudyModal: React.FC<FinovahCaseStudyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Working interactive simulator state for FINOVAH
  const [activeTab, setActiveTab] = useState<'study' | 'calculator'>('study');
  
  // Compound Growth State
  const [initialPrincipal, setInitialPrincipal] = useState<number>(1000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(100);
  const [annualRate, setAnnualRate] = useState<number>(8);
  const [years, setYears] = useState<number>(5);

  // 50/30/20 Budget State
  const [monthlyIncome, setMonthlyIncome] = useState<number>(2500);

  // Mathematical Calculation for Compound Growth
  const calculateCompound = () => {
    const P = initialPrincipal;
    const PMT = monthlyContribution;
    const r = annualRate / 100;
    const n = 12; // monthly compounding
    const t = years;

    if (r === 0) {
      const totalContributed = P + PMT * n * t;
      return {
        futureValue: totalContributed,
        totalContributions: totalContributed,
        totalInterest: 0
      };
    }

    const compoundPrincipal = P * Math.pow(1 + r / n, n * t);
    const compoundSeries = PMT * ((Math.pow(1 + r / n, n * t) - 1) / (r / n));
    const futureValue = compoundPrincipal + compoundSeries;
    const totalContributions = P + PMT * n * t;
    const totalInterest = Math.max(0, futureValue - totalContributions);

    return {
      futureValue: Math.round(futureValue),
      totalContributions: Math.round(totalContributions),
      totalInterest: Math.round(totalInterest)
    };
  };

  const results = calculateCompound();

  // 50/30/20 Calculations
  const needs = Math.round(monthlyIncome * 0.5);
  const wants = Math.round(monthlyIncome * 0.3);
  const savings = Math.round(monthlyIncome * 0.2);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0E1730]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-[#F8F7F3] w-full max-w-5xl max-h-[92vh] rounded-lg shadow-2xl border border-[#0E1730]/20 flex flex-col overflow-hidden my-auto">
        {/* Modal Top Bar */}
        <div className="bg-[#0E1730] text-white px-6 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-mono-tech text-xs text-[#E6EDF6] uppercase tracking-wider font-semibold">
              ARCHIVE / CASE STUDY / 001
            </span>
            <span aria-hidden="true" className="text-white/30">|</span>
            <span className="text-xs font-mono-tech text-[#2563EB] bg-white px-2 py-0.5 rounded font-bold">
              FINOVAH
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* View Switcher Tabs */}
            <div className="flex bg-white/10 p-0.5 rounded text-xs font-mono-tech">
              <button
                onClick={() => setActiveTab('study')}
                className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                  activeTab === 'study' ? 'bg-[#002B97] text-white font-bold' : 'text-white/70 hover:text-white'
                }`}
              >
                Case Study
              </button>
              <button
                onClick={() => setActiveTab('calculator')}
                className={`px-3 py-1 rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'calculator' ? 'bg-[#002B97] text-white font-bold' : 'text-white/70 hover:text-white'
                }`}
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Working Engine</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-10">
          {activeTab === 'study' ? (
            <>
              {/* Header Title Block */}
              <div className="border-b border-[#0E1730]/10 pb-8 space-y-3">
                <span className="text-xs font-mono-tech uppercase tracking-wider text-[#002B97] font-semibold">
                  {FINOVAH_CASE_STUDY.meta.category}
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E1730] leading-tight">
                  {FINOVAH_CASE_STUDY.title}
                </h2>
                <p className="text-base sm:text-lg text-[#111827]/75 max-w-3xl">
                  {FINOVAH_CASE_STUDY.subtitle}
                </p>

                {/* Metadata Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 mt-6 border-t border-[#0E1730]/10 font-mono-tech text-xs">
                  <div>
                    <span className="text-[#111827]/50 block">STAGE</span>
                    <span className="text-[#0E1730] font-semibold">{FINOVAH_CASE_STUDY.meta.stage}</span>
                  </div>
                  <div>
                    <span className="text-[#111827]/50 block">FOCUS</span>
                    <span className="text-[#0E1730] font-semibold">{FINOVAH_CASE_STUDY.meta.focus}</span>
                  </div>
                  <div>
                    <span className="text-[#111827]/50 block">TIMELINE</span>
                    <span className="text-[#0E1730] font-semibold">{FINOVAH_CASE_STUDY.meta.duration}</span>
                  </div>
                  <div>
                    <span className="text-[#111827]/50 block">LIVE PROTOTYPE</span>
                    <button
                      onClick={() => setActiveTab('calculator')}
                      className="text-[#002B97] font-bold hover:underline cursor-pointer"
                    >
                      Open Live Engine →
                    </button>
                  </div>
                </div>
              </div>

              {/* 10 Detailed Case Study Sections */}
              <div className="space-y-12">
                {FINOVAH_CASE_STUDY.sections.map((section) => (
                  <div key={section.id} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono-tech text-xs font-bold text-white bg-[#002B97] px-2 py-0.5 rounded">
                        {section.number}
                      </span>
                      <h3 className="font-editorial text-2xl font-bold text-[#0E1730]">
                        {section.title}
                      </h3>
                    </div>

                    <div className="pl-9 space-y-3 text-sm sm:text-base text-[#111827]/80 leading-relaxed max-w-4xl">
                      {section.content.map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}

                      {section.highlight && (
                        <div className="p-4 my-4 bg-white rounded border-l-4 border-[#002B97] text-sm font-medium text-[#0E1730] shadow-xs">
                          {section.highlight}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA to test the engine */}
              <div className="mt-10 p-6 bg-[#0E1730] text-white rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-editorial text-xl font-bold">
                    Test the Working Computational Engine
                  </h4>
                  <p className="text-xs text-[#E6EDF6]/80 mt-1 font-mono-tech">
                    Live simulation of the compound interest and 50/30/20 budgeting logic.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('calculator')}
                  className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#002B97] text-white text-xs font-mono-tech uppercase font-semibold rounded transition-colors whitespace-nowrap cursor-pointer"
                >
                  Launch Interactive Simulator →
                </button>
              </div>
            </>
          ) : (
            /* Interactive Financial Simulator Engine */
            <div className="space-y-8">
              <div className="border-b border-[#0E1730]/10 pb-4">
                <span className="text-xs font-mono-tech uppercase tracking-wider text-[#002B97] font-semibold block">
                  FINOVAH / PROTOTYPE ENGINE
                </span>
                <h3 className="font-editorial text-3xl font-bold text-[#0E1730]">
                  Working Financial Logic Simulator
                </h3>
                <p className="text-sm text-[#111827]/70 mt-1">
                  Adjust the inputs below to inspect real-time mathematical calculations for compound growth and budgeting.
                </p>
              </div>

              {/* Engine 1: Compound Interest Simulator */}
              <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#0E1730]/10 space-y-6">
                <div className="flex items-center justify-between border-b border-[#0E1730]/10 pb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#002B97]" />
                    <h4 className="font-editorial text-xl font-bold text-[#0E1730]">
                      1. Compound Growth Engine
                    </h4>
                  </div>
                  <span className="font-mono-tech text-xs text-[#111827]/60">
                    A = P(1 + r/n)^(nt) + PMT[((1 + r/n)^(nt) - 1) / (r/n)]
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Controls */}
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between text-xs font-mono-tech mb-1.5">
                        <span className="text-[#111827]/70">Initial Principal ($)</span>
                        <span className="font-bold text-[#002B97]">${initialPrincipal.toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="20000"
                        step="500"
                        value={initialPrincipal}
                        onChange={(e) => setInitialPrincipal(Number(e.target.value))}
                        className="w-full accent-[#002B97] cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-mono-tech mb-1.5">
                        <span className="text-[#111827]/70">Monthly Contribution ($)</span>
                        <span className="font-bold text-[#002B97]">${monthlyContribution.toLocaleString()}/mo</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="2000"
                        step="50"
                        value={monthlyContribution}
                        onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                        className="w-full accent-[#002B97] cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-mono-tech mb-1.5">
                        <span className="text-[#111827]/70">Annual Expected Return (%)</span>
                        <span className="font-bold text-[#002B97]">{annualRate}%</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="15"
                        step="0.5"
                        value={annualRate}
                        onChange={(e) => setAnnualRate(Number(e.target.value))}
                        className="w-full accent-[#002B97] cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-mono-tech mb-1.5">
                        <span className="text-[#111827]/70">Time Horizon (Years)</span>
                        <span className="font-bold text-[#002B97]">{years} Years</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="30"
                        step="1"
                        value={years}
                        onChange={(e) => setYears(Number(e.target.value))}
                        className="w-full accent-[#002B97] cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Real-Time Mathematical Output Card */}
                  <div className="bg-[#F8F7F3] p-6 rounded-lg border border-[#0E1730]/10 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-mono-tech uppercase text-[#002B97] font-semibold">
                        ESTIMATED FUTURE VALUE
                      </span>
                      <div className="font-editorial text-4xl sm:text-5xl font-bold text-[#0E1730] mt-1 tabular-nums">
                        ${results.futureValue.toLocaleString()}
                      </div>
                      <p className="text-xs text-[#111827]/60 mt-1 font-mono-tech">
                        Compounded monthly over {years} years.
                      </p>
                    </div>

                    <div className="space-y-3 mt-6 pt-5 border-t border-[#0E1730]/10 font-mono-tech text-xs">
                      <div className="flex justify-between">
                        <span className="text-[#111827]/70">Total Principal Deposited:</span>
                        <span className="font-semibold text-[#0E1730]">${results.totalContributions.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#111827]/70">Total Compound Interest Earned:</span>
                        <span className="font-bold text-[#2563EB]">+${results.totalInterest.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#111827]/70">Interest to Principal Ratio:</span>
                        <span className="font-semibold text-[#002B97]">
                          {results.totalContributions > 0
                            ? ((results.totalInterest / results.totalContributions) * 100).toFixed(1)
                            : 0}
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Engine 2: 50/30/20 Budgeting Allocator */}
              <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#0E1730]/10 space-y-6">
                <div className="flex items-center justify-between border-b border-[#0E1730]/10 pb-3">
                  <div className="flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-[#002B97]" />
                    <h4 className="font-editorial text-xl font-bold text-[#0E1730]">
                      2. 50/30/20 Budget Allocation Model
                    </h4>
                  </div>
                  <span className="font-mono-tech text-xs text-[#111827]/60">
                    Needs (50%) · Wants (30%) · Savings/Debt (20%)
                  </span>
                </div>

                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between text-xs font-mono-tech mb-1.5">
                      <span className="text-[#111827]/70">Monthly Net Income ($)</span>
                      <span className="font-bold text-[#002B97]">${monthlyIncome.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="500"
                      max="15000"
                      step="250"
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                      className="w-full accent-[#002B97] cursor-pointer"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div className="p-4 bg-[#F8F7F3] rounded border border-[#0E1730]/10">
                      <span className="text-[11px] font-mono-tech uppercase text-[#002B97] font-bold block mb-1">
                        NEEDS (50%)
                      </span>
                      <div className="font-editorial text-2xl font-bold text-[#0E1730] tabular-nums">
                        ${needs.toLocaleString()}
                      </div>
                      <p className="text-[11px] text-[#111827]/65 mt-1">
                        Housing, utilities, groceries, transport, basic health.
                      </p>
                    </div>

                    <div className="p-4 bg-[#F8F7F3] rounded border border-[#0E1730]/10">
                      <span className="text-[11px] font-mono-tech uppercase text-[#2563EB] font-bold block mb-1">
                        WANTS (30%)
                      </span>
                      <div className="font-editorial text-2xl font-bold text-[#0E1730] tabular-nums">
                        ${wants.toLocaleString()}
                      </div>
                      <p className="text-[11px] text-[#111827]/65 mt-1">
                        Dining out, entertainment, subscriptions, hobbies.
                      </p>
                    </div>

                    <div className="p-4 bg-[#E6EDF6] rounded border border-[#002B97]/20">
                      <span className="text-[11px] font-mono-tech uppercase text-[#002B97] font-bold block mb-1">
                        SAVINGS / DEBT (20%)
                      </span>
                      <div className="font-editorial text-2xl font-bold text-[#002B97] tabular-nums">
                        ${savings.toLocaleString()}
                      </div>
                      <p className="text-[11px] text-[#002B97]/80 mt-1">
                        Emergency fund, debt payoff, long-term investments.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Return to Case Study button */}
              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setActiveTab('study')}
                  className="px-5 py-2.5 bg-[#0E1730] text-white text-xs font-mono-tech uppercase font-semibold rounded hover:bg-[#002B97] transition-colors cursor-pointer"
                >
                  ← Return to Full Case Study
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

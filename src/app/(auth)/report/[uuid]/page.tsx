'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PrinterIcon as Print, Download } from 'lucide-react';

interface Subject {
  subject: string;
  assignment: number;
  assesment: number;
  examination: number;
  total: number;
  grade: string;
  remark: string;
}

interface StudentResult {
  name: string;
  session: string;
  class: string;
  term: string;
  position: string;
  noOfStudents: string;
  closingDate: string;
  resumptionDate: string;
  subjects: Subject[];
  affectiveSkills: {
    punctuality: string;
    politeness: string;
    neatness: string;
    honesty: string;
    leadershipSkills: string;
    attentiveness: string;
    cooperation: string;
  };
  teacherRemark: string;
  principalRemark: string;
}

export default function TraditionalResultSheet() {
  const [showPrintView, setShowPrintView] = useState(false);

  const sampleResult: StudentResult = {
    name: 'ALICE JOHNSON',
    session: '2023/2024',
    class: 'JSS 2A',
    term: 'FIRST TERM',
    position: '3RD',
    noOfStudents: '45',
    closingDate: '15TH DECEMBER, 2023',
    resumptionDate: '8TH JANUARY, 2024',
    subjects: [
      {
        subject: 'ENGLISH LANGUAGE',
        assignment: 4,
        assesment: 12,
        examination: 52,
        total: 68,
        grade: 'A',
        remark: 'EXCELLENT',
      },
      {
        subject: 'MATHEMATICS',
        assignment: 5,
        assesment: 14,
        examination: 55,
        total: 74,
        grade: 'A',
        remark: 'EXCELLENT',
      },
      {
        subject: 'BASIC SCIENCE',
        assignment: 4,
        assesment: 11,
        examination: 48,
        total: 63,
        grade: 'B',
        remark: 'VERY GOOD',
      },
      {
        subject: 'BASIC TECHNOLOGY',
        assignment: 3,
        assesment: 13,
        examination: 45,
        total: 61,
        grade: 'B',
        remark: 'VERY GOOD',
      },
      {
        subject: 'AGRIC TECHNOLOGY',
        assignment: 4,
        assesment: 12,
        examination: 42,
        total: 58,
        grade: 'C',
        remark: 'GOOD',
      },
      {
        subject: 'CIVIC EDUCATION',
        assignment: 5,
        assesment: 13,
        examination: 50,
        total: 68,
        grade: 'A',
        remark: 'EXCELLENT',
      },
      {
        subject: 'COMPUTER SCIENCE',
        assignment: 4,
        assesment: 14,
        examination: 53,
        total: 71,
        grade: 'A',
        remark: 'EXCELLENT',
      },
      {
        subject: 'BUSINESS STUDIES',
        assignment: 3,
        assesment: 11,
        examination: 44,
        total: 58,
        grade: 'C',
        remark: 'VERY GOOD',
      },
      {
        subject: 'SOCIAL STUDIES',
        assignment: 4,
        assesment: 12,
        examination: 46,
        total: 62,
        grade: 'B',
        remark: 'VERY GOOD',
      },
      {
        subject: 'HOME ECONOMICS',
        assignment: 5,
        assesment: 13,
        examination: 41,
        total: 59,
        grade: 'C',
        remark: 'VERY GOOD',
      },
      {
        subject: 'P.H.E',
        assignment: 4,
        assesment: 14,
        examination: 47,
        total: 65,
        grade: 'B',
        remark: 'VERY GOOD',
      },
      {
        subject: 'I.R.K',
        assignment: 3,
        assesment: 11,
        examination: 38,
        total: 52,
        grade: 'C',
        remark: 'GOOD',
      },
      {
        subject: 'QURAN',
        assignment: 5,
        assesment: 14,
        examination: 49,
        total: 68,
        grade: 'A',
        remark: 'EXCELLENT',
      },
      {
        subject: 'HAUSA',
        assignment: 4,
        assesment: 12,
        examination: 43,
        total: 59,
        grade: 'C',
        remark: 'VERY GOOD',
      },
    ],
    affectiveSkills: {
      punctuality: '4',
      politeness: '5',
      neatness: '4',
      honesty: '5',
      leadershipSkills: '4',
      attentiveness: '5',
      cooperation: '4',
    },
    teacherRemark: 'Alice is a brilliant and hardworking student. Keep it up!',
    principalRemark:
      'Excellent performance. Continue to maintain this standard.',
  };

  const totalScores = sampleResult.subjects.reduce(
    (sum, subject) => sum + subject.total,
    0
  );
  const average = (totalScores / sampleResult.subjects.length).toFixed(1);

  const handlePrint = () => {
    setShowPrintView(true);
    setTimeout(() => {
      window.print();
      setShowPrintView(false);
    }, 100);
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Control Buttons - Hidden in print */}
      <div className='no-print p-4 mb-3 bg-white border-b'>
        <div className='max-w-4xl mx-auto flex justify-between items-center'>
          <h1 className='text-xl font-bold'>Report Sheet</h1>
          <div className='flex gap-2'>
            <Button onClick={handlePrint} className='gap-2'>
              <Print className='h-4 w-4' />
              Print Result
            </Button>
          </div>
        </div>
      </div>

      <div className={`${showPrintView && 'flex'}`}>
        {/* Result Sheet - A4 Format */}
        <div className={`result-sheet ${showPrintView && 'print-view'}`}>
          <div className='page-content'>
            {/* Header */}
            <div className='text-center mb-6'>
              <h1 className='text-xl font-bold tracking-wider'>RESULT</h1>
            </div>

            {/* Student Information */}
            <div className='student-info mb-6'>
              <div className='info-row'>
                <div className='info-field'>
                  <span className='label'>NAME:</span>
                  <span className='underline'>{sampleResult.name}</span>
                </div>
                <div className='info-field'>
                  <span className='label'>SESSION:</span>
                  <span className='underline'>{sampleResult.session}</span>
                </div>
              </div>

              <div className='info-row'>
                <div className='info-field'>
                  <span className='label'>CLASS:</span>
                  <span className='underline'>{sampleResult.class}</span>
                </div>
                <div className='info-field'>
                  <span className='label'>TERM:</span>
                  <span className='underline'>{sampleResult.term}</span>
                </div>
              </div>

              <div className='info-row'>
                <div className='info-field'>
                  <span className='label'>POSITION:</span>
                  <span className='underline'>{sampleResult.position}</span>
                </div>
                <div className='info-field'>
                  <span className='label'>NO. OF STUDENTS:</span>
                  <span className='underline'>{sampleResult.noOfStudents}</span>
                </div>
              </div>

              <div className='info-row'>
                <div className='info-field'>
                  <span className='label'>CLOSING DATE:</span>
                  <span className='underline'>{sampleResult.closingDate}</span>
                </div>
                <div className='info-field'>
                  <span className='label'>RESUMPTION DATE:</span>
                  <span className='underline'>
                    {sampleResult.resumptionDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Results Table */}
            <div className='results-table mb-6'>
              <table className='w-full border-collapse border-2 border-black'>
                <thead>
                  <tr className='bg-yellow-100'>
                    <th className='border border-black p-2 text-left font-bold'>
                      SUBJECTS
                    </th>
                    <th className='border border-black p-1 text-center font-bold text-xs'>
                      ASSIGNMENT
                    </th>
                    <th className='border border-black p-1 text-center font-bold text-xs'>
                      ASSESMENT
                    </th>
                    <th className='border border-black p-1 text-center font-bold text-xs'>
                      EXAMINATION
                    </th>
                    <th className='border border-black p-1 text-center font-bold text-xs'>
                      TOTAL
                    </th>
                    <th className='border border-black p-1 text-center font-bold text-xs'>
                      GRADE
                    </th>
                    <th className='border border-black p-1 text-center font-bold text-xs'>
                      REMARK
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sampleResult.subjects.map((subjectData, index) => (
                    <tr key={index}>
                      <td className='border border-black p-2 font-semibold'>
                        {subjectData.subject}
                      </td>
                      <td className='border border-black p-1 text-center'>
                        {subjectData.assignment}
                      </td>
                      <td className='border border-black p-1 text-center'>
                        {subjectData.assesment}
                      </td>
                      <td className='border border-black p-1 text-center'>
                        {subjectData.examination}
                      </td>
                      <td className='border border-black p-1 text-center font-bold'>
                        {subjectData.total}
                      </td>
                      <td className='border border-black p-1 text-center font-bold'>
                        {subjectData.grade}
                      </td>
                      <td className='border border-black p-1 text-center text-xs'>
                        {subjectData.remark}
                      </td>
                    </tr>
                  ))}
                  {/* Empty rows */}
                  {Array.from({
                    length: Math.max(0, 15 - sampleResult.subjects.length),
                  }).map((_, index) => (
                    <tr key={`empty-${index}`}>
                      <td className='border border-black p-2'>&nbsp;</td>
                      <td className='border border-black p-1'>&nbsp;</td>
                      <td className='border border-black p-1'>&nbsp;</td>
                      <td className='border border-black p-1'>&nbsp;</td>
                      <td className='border border-black p-1'>&nbsp;</td>
                      <td className='border border-black p-1'>&nbsp;</td>
                      <td className='border border-black p-1'>&nbsp;</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary Section */}
            <div className='summary-section mb-2'>
              <div className='flex justify-between items-start'>
                <div className='flex justify-between item-center gap-2'>
                  <h3 className='text-md font-bold mb-2'>TOTAL SCORES</h3>
                  <div className='text-md font-bold'>{totalScores}</div>
                </div>
                <div className='flex justify-between item-center gap-2'>
                  <h3 className='text-md font-bold mb-2'>AVERAGE:</h3>
                  <div className='text-md font-bold'>{average}</div>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className='bottom-section text-xs'>
              <div className='flex justify-between'>
                {/* Affective Skills */}
                <div className='affective-skills'>
                  <h3 className='font-bold mb-2'>AFFECTIVE SKILLS</h3>
                  <table className='border-collapse border border-black'>
                    <tbody>
                      <tr>
                        <td className='border border-black p-1 font-semibold'>
                          PUNCTUALITY
                        </td>
                        <td className='border border-black p-1 text-center w-12'></td>
                      </tr>
                      <tr>
                        <td className='border border-black p-1 font-semibold'>
                          POLITENESS
                        </td>
                        <td className='border border-black p-1 text-center'></td>
                      </tr>
                      <tr>
                        <td className='border border-black p-1 font-semibold'>
                          NEATNESS
                        </td>
                        <td className='border border-black p-1 text-center'></td>
                      </tr>
                      <tr>
                        <td className='border border-black p-1 font-semibold'>
                          HONESTY
                        </td>
                        <td className='border border-black p-1 text-center'></td>
                      </tr>
                      <tr>
                        <td className='border border-black p-1 font-semibold italic'>
                          LEADERSHIP SKILLS
                        </td>
                        <td className='border border-black p-1 text-center'></td>
                      </tr>
                      <tr>
                        <td className='border border-black p-1 font-semibold italic'>
                          ATTENTIVENESS
                        </td>
                        <td className='border border-black p-1 text-center'></td>
                      </tr>
                      <tr>
                        <td className='border border-black p-1 font-semibold italic'>
                          COOPERATION
                        </td>
                        <td className='border border-black p-1 text-center'></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Grading System */}
                <div className='grading-system'>
                  <h3 className='font-bold mb-2'>GRADING SYSTEM</h3>
                  <table className='border-collapse border border-black w-full'>
                    <tbody>
                      <tr>
                        <td className='border border-black p-1 text-center font-bold'>
                          A
                        </td>
                        <td className='border border-black p-1 text-center'>
                          70-100
                        </td>
                      </tr>
                      <tr>
                        <td className='border border-black p-1 text-center font-bold'>
                          B
                        </td>
                        <td className='border border-black p-1 text-center'>
                          60-69
                        </td>
                      </tr>
                      <tr>
                        <td className='border border-black p-1 text-center font-bold'>
                          C
                        </td>
                        <td className='border border-black p-1 text-center'>
                          50-59
                        </td>
                      </tr>
                      <tr>
                        <td className='border border-black p-1 text-center font-bold'>
                          D
                        </td>
                        <td className='border border-black p-1 text-center'>
                          40-49
                        </td>
                      </tr>
                      <tr>
                        <td className='border border-black p-1 text-center font-bold'>
                          E
                        </td>
                        <td className='border border-black p-1 text-center'>
                          0-39
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Remarks Section */}
            <div className='mt-3'>
              <div className='mb-4'>
                <div className='flex items-center'>
                  <span className='font-bold mr-2'>TEACHER'S REMARK:</span>
                  <div className='flex-1 border-b border-black'>
                    {sampleResult.teacherRemark}
                  </div>
                </div>
              </div>

              <div className='mt-3'>
                <div className='flex items-center'>
                  <span className='font-bold mr-2'>PRINCIPAL'S REMARK:</span>
                  <div className='flex-1 border-b border-black'>
                    {sampleResult.principalRemark}
                  </div>
                </div>
              </div>

              <div className='mt-5'>
                <div className='flex justify-end'>
                  <div className='flex items-center'>
                    <span className='font-bold mr-2'>SIGN:</span>
                    <div className='w-48 border-b border-black pb-1'></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .result-sheet {
          max-width: 210mm;
          margin: 0 auto;
          background: white;
          padding: 20mm;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .page-content {
          font-family: 'Times New Roman', serif;
          font-size: 12px;
          line-height: 1.2;
        }

        .student-info {
          font-size: 14px;
          font-weight: bold;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .info-field {
          display: flex;
          align-items: center;
          width: 48%;
        }

        .label {
          font-weight: bold;
          margin-right: 8px;
        }

        .underline {
          flex: 1;
          border-bottom: 1px solid black;
          padding-bottom: 2px;
          text-align: center;
        }

        .results-table table {
          font-size: 11px;
        }

        .results-table th {
          background-color: #fef3c7;
        }

        @media print {
          .no-print {
            display: none !important;
          }

          .result-sheet {
            box-shadow: none;
            margin: 0;
            padding: 15mm;
            max-width: none;
            width: 100%;
          }

          .page-content {
            font-size: 11px;
          }

          .student-info {
            font-size: 12px;
          }

          body {
            margin: 0;
            padding: 0;
          }

          @page {
            size: A4;
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
}

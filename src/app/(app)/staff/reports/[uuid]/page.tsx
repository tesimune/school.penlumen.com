'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, Save, Edit, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';

interface Assessment {
  uuid: string;
  result_uuid: string;
  subject: string;
  assignment: number;
  assesment: number;
  examination: number;
  overall: number;
  grade: string;
}

export default function EditableReportPage() {
  const [isEditing, setIsEditing] = useState(false);

  const originalReport = {
    id: 1,
    uuid: 'report-001',
    student_uuid: 'student-001',
    class_name: 'JSS 2A',
    overall: 100,
    remark: 'Excellent performance across all subjects',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-16T14:30:00Z',
    status: 'approved',
    approved_by: 'Mrs. Johnson',
    approved_at: '2024-01-16T14:30:00Z',
    student: {
      uuid: 'student-001',
      name: 'Alice Johnson',
      reg_number: 'STU001',
      avatar: '/placeholder.svg?height=40&width=40',
      class_name: 'JSS 2A',
      branch: 'Main Campus',
    },
    assessments: [
      {
        uuid: 'assess-001',
        result_uuid: 'report-001',
        subject: 'Mathematics',
        assignment: 4,
        assesment: 12,
        examination: 52,
        overall: 68,
        grade: 'A',
      },
      {
        uuid: 'assess-002',
        result_uuid: 'report-001',
        subject: 'English Language',
        assignment: 5,
        assesment: 14,
        examination: 55,
        overall: 74,
        grade: 'A',
      },
    ],
    teacherRemark:
      'Student shows excellent understanding of concepts and consistent performance.',
    principalRemark:
      'Outstanding academic achievement. Keep up the excellent work.',
  };

  const [editableReport, setEditableReport] = useState(originalReport);
  const [editableAssessments, setEditableAssessments] = useState<Assessment[]>(
    originalReport.assessments
  );

  // Calculate grade based on overall score
  const calculateGrade = (overall: number): string => {
    if (overall >= 70) return 'A';
    if (overall >= 60) return 'B';
    if (overall >= 50) return 'C';
    if (overall >= 40) return 'D';
    return 'F';
  };

  // Update assessment scores and recalculate overall and grade
  const updateAssessment = (
    uuid: string,
    field: 'assignment' | 'assesment' | 'examination',
    value: number
  ) => {
    setEditableAssessments((prev) =>
      prev.map((assessment) => {
        if (assessment.uuid === uuid) {
          const updated = { ...assessment, [field]: value };
          // Recalculate overall and grade
          updated.overall =
            updated.assignment + updated.assesment + updated.examination;
          updated.grade = calculateGrade(updated.overall);
          return updated;
        }
        return assessment;
      })
    );
  };

  const updateRemark = (
    field: 'teacherRemark' | 'principalRemark',
    value: string
  ) => {
    setEditableReport((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // Here you would typically save to your backend
    console.log('Saving report:', {
      ...editableReport,
      assessments: editableAssessments,
    });
    setIsEditing(false);
    // Show success message or handle response
  };

  const handleCancel = () => {
    // Reset to original values
    setEditableReport(originalReport);
    setEditableAssessments(originalReport.assessments);
    setIsEditing(false);
  };

  const getGradeBadge = (grade: string) => {
    const gradeColors: Record<string, string> = {
      'A+': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      A: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      'A-': 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300',
      'B+': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      B: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
      'B-': 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-200',
      'C+': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      C: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300',
      D: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
      F: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    };
    return gradeColors[grade] || 'bg-gray-100 text-gray-800';
  };

  // Calculate overall report score
  const calculateOverallScore = () => {
    if (editableAssessments.length === 0) return 0;
    const total = editableAssessments.reduce(
      (sum, assessment) => sum + assessment.overall,
      0
    );
    return Math.round(total / editableAssessments.length);
  };

  return (
    <div className='space-y-6 p-6'>
      {/* Header with Edit Controls */}
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Student Report Card</h1>
        <div className='flex gap-2'>
          {!isEditing ? (
            <>
              <Button onClick={() => setIsEditing(true)} className='gap-2'>
                <Edit className='h-4 w-4' />
                Edit Report
              </Button>
              <Link
                href={`/report/${editableReport.student.uuid}`}
                target='_blank'
              >
                <Button className='gap-2'>
                  <Save className='h-4 w-4' />
                  <span>Generate Report</span>
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Button
                variant='outline'
                onClick={handleCancel}
                className='gap-2'
              >
                <X className='h-4 w-4' />
                Cancel
              </Button>
              <Button onClick={handleSave} className='gap-2'>
                <Save className='h-4 w-4' />
                Save Changes
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Student Information Card */}
      <Card>
        <CardHeader>
          <CardTitle className='text-lg'>Student Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex items-center gap-4 mb-4'>
            <Avatar className='h-16 w-16'>
              <AvatarImage
                src={editableReport.student.avatar || '/placeholder.svg'}
              />
              <AvatarFallback className='text-xl'>
                {editableReport.student.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className='flex-1'>
              <h3 className='text-xl font-semibold'>
                {editableReport.student.name}
              </h3>
              <p className='text-muted-foreground'>
                {editableReport.student.reg_number}
              </p>
              <div className='flex items-center gap-4 mt-2'>
                <Badge variant='outline'>{editableReport.class_name}</Badge>
                <Badge variant='outline'>{editableReport.student.branch}</Badge>
                <Badge
                  className={
                    calculateOverallScore() >= 50
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }
                >
                  Overall: {calculateOverallScore()}%
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assessments Table */}
      <Card>
        <CardHeader>
          <CardTitle className='text-lg'>Subject Assessments</CardTitle>
          {isEditing && (
            <p className='text-sm text-muted-foreground'>
              Edit scores below. Overall scores and grades will be calculated
              automatically.
            </p>
          )}
        </CardHeader>
        <CardContent>
          <div className='overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead className='text-center'>Assignment</TableHead>
                  <TableHead className='text-center'>Assessment</TableHead>
                  <TableHead className='text-center'>Examination</TableHead>
                  <TableHead className='text-center'>Overall</TableHead>
                  <TableHead className='text-center'>Grade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {editableAssessments.map((assessment) => (
                  <TableRow key={assessment.uuid}>
                    <TableCell className='font-medium'>
                      {assessment.subject}
                    </TableCell>
                    <TableCell className='text-center'>
                      {isEditing ? (
                        <Input
                          type='number'
                          min='0'
                          max='5'
                          value={assessment.assignment}
                          onChange={(e) =>
                            updateAssessment(
                              assessment.uuid,
                              'assignment',
                              Number(e.target.value)
                            )
                          }
                          className='w-16 text-center'
                        />
                      ) : (
                        assessment.assignment
                      )}
                    </TableCell>
                    <TableCell className='text-center'>
                      {isEditing ? (
                        <Input
                          type='number'
                          min='0'
                          max='15'
                          value={assessment.assesment}
                          onChange={(e) =>
                            updateAssessment(
                              assessment.uuid,
                              'assesment',
                              Number(e.target.value)
                            )
                          }
                          className='w-16 text-center'
                        />
                      ) : (
                        assessment.assesment
                      )}
                    </TableCell>
                    <TableCell className='text-center'>
                      {isEditing ? (
                        <Input
                          type='number'
                          min='0'
                          max='80'
                          value={assessment.examination}
                          onChange={(e) =>
                            updateAssessment(
                              assessment.uuid,
                              'examination',
                              Number(e.target.value)
                            )
                          }
                          className='w-16 text-center'
                        />
                      ) : (
                        assessment.examination
                      )}
                    </TableCell>
                    <TableCell className='text-center font-bold'>
                      {assessment.overall}
                    </TableCell>
                    <TableCell className='text-center'>
                      <Badge className={getGradeBadge(assessment.grade)}>
                        {assessment.grade}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Report Summary with Editable Remarks */}
      <Card>
        <CardHeader>
          <CardTitle className='text-lg'>Report Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-6'>
            {/* Teacher's Remark */}
            <div>
              <Label className='text-sm font-medium mb-2 block'>
                Teacher's Remark
              </Label>
              {isEditing ? (
                <Textarea
                  value={editableReport.teacherRemark}
                  onChange={(e) =>
                    updateRemark('teacherRemark', e.target.value)
                  }
                  placeholder="Enter teacher's remark..."
                  className='min-h-[80px]'
                />
              ) : (
                <div className='p-3 bg-muted/50 rounded-md'>
                  <p className='text-sm'>{editableReport.teacherRemark}</p>
                </div>
              )}
            </div>

            {/* Principal's Remark */}
            <div>
              <Label className='text-sm font-medium mb-2 block'>
                Principal's Remark
              </Label>
              {isEditing ? (
                <Textarea
                  value={editableReport.principalRemark}
                  onChange={(e) =>
                    updateRemark('principalRemark', e.target.value)
                  }
                  placeholder="Enter principal's remark..."
                  className='min-h-[80px]'
                />
              ) : (
                <div className='p-3 bg-muted/50 rounded-md'>
                  <p className='text-sm'>{editableReport.principalRemark}</p>
                </div>
              )}
            </div>

            {/* Report Metadata */}
            <div className='grid grid-cols-2 gap-4 text-sm pt-4 border-t'>
              <div>
                <Label className='text-sm font-medium'>Created Date</Label>
                <p className='mt-1'>
                  {new Date(editableReport.created_at).toLocaleString()}
                </p>
              </div>
              <div>
                <Label className='text-sm font-medium'>Last Updated</Label>
                <p className='mt-1'>
                  {new Date(editableReport.updated_at).toLocaleString()}
                </p>
              </div>
              {editableReport.approved_by && (
                <>
                  <div>
                    <Label className='text-sm font-medium'>Approved By</Label>
                    <p className='mt-1'>{editableReport.approved_by}</p>
                  </div>
                  <div>
                    <Label className='text-sm font-medium'>Approval Date</Label>
                    <p className='mt-1'>
                      {editableReport.approved_at &&
                        new Date(editableReport.approved_at).toLocaleString()}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Confirmation */}
      {isEditing && (
        <Card className='border-orange-200 bg-orange-50/50'>
          <CardContent className='pt-6'>
            <div className='flex items-center gap-2 text-orange-800'>
              <Clock className='h-4 w-4' />
              <p className='text-sm font-medium'>
                You have unsaved changes. Remember to save your edits before
                leaving this page.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

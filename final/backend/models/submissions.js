import { randomUUID as uuid } from 'crypto';

function handleSubmission() {

    const submissionList = {};
    const submissions = {};

    submissionList.contains = function contains(id) {
        return !!submissions[id];
    };

    submissionList.getSubmission = function getSubmission(id) {
        return submissions[id];
    };

    submissionList.getAllSubmissions = function getAllSubmissions() {
        return submissions;
    };

    submissionList.getSubmissionsByStudent = function getSubmissionsByStudent(student) {
        const resultData = {};
        Object.keys(submissions).forEach(id => {
            if (submissions[id].student === student) {
                resultData[id] = submissions[id];
            };
        });
        return resultData;
    };

    submissionList.getSubmissionsByAssignment = function getSubmissionsByAssignment(assignmentId) {
        const resultData = {};
        Object.keys(submissions).forEach(id => {
            if (submissions[id].assignmentId === assignmentId) {
                resultData[id] = submissions[id];
            };
        });
        return resultData;
    }

    submissionList.getAllSubmissionsByStudentAndAssignment = function getAllSubmissionsByStudentAndAssignment(student, assignmentId) {
        const result = [];
        Object.keys(submissions).forEach(id => {
            const submission = submissions[id];
            if (submission.student === student && submission.assignmentId === assignmentId) {
                result.push(submission);
            }
        });
        
        result.sort((a, b) => a.attemptNumber - b.attemptNumber);
        return result;
    };

    submissionList.getSubmissionCountByStudentAndAssignment = function getSubmissionCountByStudentAndAssignment(student, assignmentId) {
        let count = 0;
        Object.keys(submissions).forEach(id => {
            const submission = submissions[id];
            if (submission.student === student && submission.assignmentId === assignmentId) {
                count++;
            }
        });
        return count;
    };

    submissionList.getLatestSubmissionByStudentAndAssignment = function getLatestSubmissionByStudentAndAssignment(student, assignmentId) {
        const allSubmissions = submissionList.getAllSubmissionsByStudentAndAssignment(student, assignmentId);
        if (allSubmissions.length === 0) {
            return null;
        }
    
        return allSubmissions[allSubmissions.length - 1];
    };

    submissionList.addSubmission = function addSubmission(student, assignmentId, content) {

        const currentAttemptNumber = submissionList.getSubmissionCountByStudentAndAssignment(student, assignmentId) + 1;
        const id = uuid();

        submissions[id] = {
            id,
            student,
            assignmentId,
            content,
            attemptNumber: currentAttemptNumber,
            submittedAt: new Date().toISOString(),
            comments: null,
        };
        return id;
    };

    submissionList.updateSubmission = function updateSubmission(id, updates) {
        if(!submissions[id]) {
            return false;
        };

        if(updates.content !== undefined) {
            submissions[id].content = updates.content;
            submissions[id].updatedAt = new Date().toISOString();
        };

        if(updates.comments !== undefined) {
            submissions[id].comments = updates.comments;
            submissions[id].updatedAt = new Date().toISOString();
        };

        if(updates.isLate !== undefined) {
            submissions[id].isLate = updates.isLate;
        }
        
        return true;
    };

    submissionList.deleteSubmission = function deleteSubmission(id) {
        if(!submissions[id]) {
            return false;
        };

        delete submissions[id];
        return true;
    };

    submissionList.deleteSubmissionsForAssignment = function deleteSubmissionsForAssignment(assignmentId) {
        let deleted = 0;
        Object.keys(submissions).forEach(id => {
            if(submissions[id].assignmentId === assignmentId) {
                delete submissions[id];
                deleted++;
            };
        });
        return deleted;
    };

    return submissionList;
};

export default {
    handleSubmission,
};
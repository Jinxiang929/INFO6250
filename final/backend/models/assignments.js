import { randomUUID as uuid } from 'crypto';

let assignmentListInstance = null;

function handleAssignment() {

    if (assignmentListInstance) {
        return assignmentListInstance;
    }

    const id1 = uuid();
    const id2 = uuid();

    const assignmentList = {};
    const assignments = {
        [id1]: {
            id: id1,
            title: 'project1',
            description: 'back-end practise',
            dueDate: '2025-04-20',
            allowedAttempts: 2,
            createdAt: new Date().toISOString(),
        },

        [id2]: {
            id: id2,
            title: 'project2',
            description: 'front-end practise',
            dueDate: '2025-04-30',
            allowedAttempts: 1,
            createdAt: new Date().toISOString(),
        },
    };

    assignmentList.getAllAssignments = function getAllAssignments() {
        return assignments;
    };

    assignmentList.addAssignment = function addAssignment(title, description, dueDate, allowedAttempts = 1) {
        const id = uuid();
        assignments[id] = {
            id,
            title,
            description,
            dueDate,
            allowedAttempts: allowedAttempts,
            createdAt: new Date().toISOString(),
        };
        return id;
    };

    assignmentList.getAssignment = function getAssignment(id) {
        return assignments[id];
    };

    assignmentList.contains = function contains(id) {
        return !!assignments[id];
    };

    assignmentList.updateAssignment = function updateAssignment(id, updates) {
        if(!assignments[id]) {
            return false;
        };

        assignments[id] = {
            ...assignments[id],
            title: updates.title || assignments[id].title,
            description: updates.description !== undefined ? updates.description : assignments[id].description,
            dueDate: updates.dueDate || assignments[id].dueDate,
            allowedAttempts: updates.allowedAttempts !== undefined ? updates.allowedAttempts : assignments[id].allowedAttempts,
            updatedAt: new Date().toISOString(),
        };

        return true;
    };

    assignmentList.deleteAssignment = function deleteAssignment(id) {
        if(!assignments[id]) {
            return false;
        };

        delete assignments[id];
        return true;
    };

    assignmentListInstance = assignmentList;
    return assignmentList;
};

export default {
    handleAssignment,
};
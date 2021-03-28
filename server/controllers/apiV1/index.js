import examController from './examController';
import qGroupController from './qGroupController';
import questionController from './questionController';
import userController from './userController';
import guestAccessController from './guestAccessController';

const allController = {};
allController.examController = examController;
allController.qGroupController = qGroupController;
allController.questionController = questionController;
allController.userController = userController;
allController.guestAccessController = guestAccessController;
export default allController;

export {
    examController, userController, questionController, qGroupController, guestAccessController
};
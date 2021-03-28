import Questions from '../../server/models/questions';
const questionsJson = {
    q1:{
        model: Questions,
        right:{
            question: "The sum of 2 & 3 is equal to ______ ?",
            questionNote: 'elementary mathematics',
            questionType: "optionsSingle",
            options: {
                a: 4,
                b: 5,
                c: 9,
                d: 7
            },
            hint: 'elementary maths',
            solution: 7,
            correctAnswer: {
                d: 7
            },
            tags: ['elementary maths', 'standard i'],
            index: 1
        }
    }
};

export default questionsJson;
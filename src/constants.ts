import { Team } from "./types";

export const CHRONO_DURATION = 45000
export const TEAMS: [Team, Team] = [{
    id: 0,
    label: "verte"
}, {
    id: 1,
    label: "rouge"
}]



export const QCM = [
    {
        question: '7 + (-4)',
        answers: [
            {
                id: 0,
                value: '3',
                correct: true
            },
            {
                id: 1,
                value: '-11',
                correct: false
            },
            {
                id: 2,
                value: '-3',
                correct: false
            },
            {
                id: 3,
                value: '11',
                correct: false
            }]
    },
    {
        question: '(-5) + (-7)',
        answers: [
            {
                id: 0,
                value: '35',
                correct: false
            },
            {
                id: 1,
                value: '-35',
                correct: false
            },
            {
                id: 2,
                value: '12',
                correct: false
            },
            {
                id: 3,
                value: '-12',
                correct: true
            }]
    },
    {
        question: '(-4) + 5',
        answers: [
            {
                id: 0,
                value: '(-4)x5',
                correct: false
            },
            {
                id: 1,
                value: '+(5-4)',
                correct: true
            },
            {
                id: 2,
                value: '-1',
                correct: false
            },
            {
                id: 3,
                value: '-9',
                correct: false
            }]
    },
    {
        question: '8 + (-11)',
        answers: [
            {
                id: 0,
                value: '-3',
                correct: true
            },
            {
                id: 1,
                value: '-19',
                correct: false
            },
            {
                id: 2,
                value: '19',
                correct: false
            },
            {
                id: 3,
                value: '3',
                correct: false
            }]
    },
    {
        question: '0 + (-4)',
        answers: [
            {
                id: 0,
                value: '4',
                correct: false
            },
            {
                id: 1,
                value: '-4',
                correct: true
            },
            {
                id: 2,
                value: '0',
                correct: false
            },
            {
                id: 3,
                value: '2x2',
                correct: false
            }]
    },
    {
        question: '-7 + (-12)',
        answers: [
            {
                id: 0,
                value: '84',
                correct: false
            },
            {
                id: 1,
                value: '-5',
                correct: false
            },
            {
                id: 2,
                value: '-19',
                correct: true
            },
            {
                id: 3,
                value: '-18',
                correct: false
            }]
    }, {
        question: '6 + (-10)',
        answers: [
            {
                id: 0,
                value: '-(10-6)',
                correct: true
            },
            {
                id: 1,
                value: '16',
                correct: false
            },
            {
                id: 2,
                value: '-16',
                correct: false
            },
            {
                id: 3,
                value: '4',
                correct: false
            }]
    }, {
        question: '-10 + (-15)',
        answers: [
            {
                id: 0,
                value: '-25',
                correct: true
            },
            {
                id: 1,
                value: '-150',
                correct: false
            },
            {
                id: 2,
                value: '150',
                correct: false
            },
            {
                id: 3,
                value: '25',
                correct: false
            }]
    }, {
        question: '2 + (-9)',
        answers: [
            {
                id: 0,
                value: '-7',
                correct: true
            },
            {
                id: 1,
                value: '(-2) + 9',
                correct: false
            },
            {
                id: 2,
                value: '7',
                correct: false
            },
            {
                id: 3,
                value: '-18',
                correct: false
            }]
    }, {
        question: '-7 +13 - (-4)',
        answers: [
            {
                id: 0,
                value: '10',
                correct: true
            },
            {
                id: 1,
                value: '2',
                correct: false
            },
            {
                id: 2,
                value: '16',
                correct: false
            },
            {
                id: 3,
                value: '0',
                correct: false
            }]
    }, {
        question: '(-5,5) - (-4,1)',
        answers: [
            {
                id: 0,
                value: '-1,4',
                correct: true
            },
            {
                id: 1,
                value: '-9,6',
                correct: false
            },
            {
                id: 2,
                value: '9,6',
                correct: false
            },
            {
                id: 3,
                value: '1,4',
                correct: false
            }]
    }, {
        question: '-4,5 - (-6,5) ',
        answers: [
            {
                id: 0,
                value: '36:18',
                correct: true
            },
            {
                id: 1,
                value: '11',
                correct: false
            },
            {
                id: 2,
                value: '-2',
                correct: false
            },
            {
                id: 3,
                value: '1+(-1)',
                correct: false
            }]
    }, {
        question: '(-2) x 5',
        answers: [
            {
                id: 0,
                value: '-10',
                correct: true
            },
            {
                id: 1,
                value: '10',
                correct: false
            },
            {
                id: 2,
                value: '-7',
                correct: false
            },
            {
                id: 3,
                value: '3',
                correct: false
            }]
    }, {
        question: '-10 x (-5)',
        answers: [
            {
                id: 0,
                value: '30 + 10 + 10',
                correct: true
            },
            {
                id: 1,
                value: '-50',
                correct: false
            },
            {
                id: 2,
                value: '25-25',
                correct: false
            },
            {
                id: 3,
                value: '5',
                correct: false
            }]
    }, {
        question: '(-3) x 4 x 10',
        answers: [
            {
                id: 0,
                value: '-120',
                correct: true
            },
            {
                id: 1,
                value: '70',
                correct: false
            },
            {
                id: 2,
                value: '-70',
                correct: false
            },
            {
                id: 3,
                value: '120',
                correct: false
            }]
    }, {
        question: '4 x (-2,5) x (-2)',
        answers: [
            {
                id: 0,
                value: '-20',
                correct: true
            },
            {
                id: 1,
                value: '18',
                correct: false
            },
            {
                id: 2,
                value: '16,5',
                correct: false
            },
            {
                id: 3,
                value: '4 x 4,5',
                correct: false
            }]
    }, {
        question: '(-2) x (-2) x (-2) x (-2) x (-2)',
        answers: [
            {
                id: 0,
                value: '-32',
                correct: true
            },
            {
                id: 1,
                value: '-10',
                correct: false
            },
            {
                id: 2,
                value: '24',
                correct: false
            },
            {
                id: 3,
                value: '22222',
                correct: false
            }]
    }, {
        question: '-5 x (-10) x (-20)',
        answers: [
            {
                id: 0,
                value: '-1000',
                correct: true
            },
            {
                id: 1,
                value: '500',
                correct: false
            },
            {
                id: 2,
                value: '-500',
                correct: false
            },
            {
                id: 3,
                value: '1000',
                correct: false
            }]
    }, {
        question: '(-10) / 5',
        answers: [
            {
                id: 0,
                value: '-4 + 2',
                correct: true
            },
            {
                id: 1,
                value: '100 - 50',
                correct: false
            },
            {
                id: 2,
                value: '50 - 25',
                correct: false
            },
            {
                id: 3,
                value: '2',
                correct: false
            }]
    }, {
        question: '4 + 8 x (-3)',
        answers: [
            {
                id: 0,
                value: '28',
                correct: false
            },
            {
                id: 1,
                value: '-36',
                correct: false
            },
            {
                id: 2,
                value: '36',
                correct: false
            },
            {
                id: 3,
                value: '20',
                correct: true
            }]
    }, {
        question: '5 x (-2,1) + 7',
        answers: [
            {
                id: 0,
                value: '17,5',
                correct: false
            },
            {
                id: 1,
                value: '-17,5',
                correct: false
            },
            {
                id: 2,
                value: '3,5',
                correct: false
            },
            {
                id: 3,
                value: '-3,5',
                correct: true
            }]
    }, {
        question: '63 x (-40)',
        answers: [
            {
                id: 0,
                value: '2520',
                correct: false
            },
            {
                id: 1,
                value: '103',
                correct: false
            },
            {
                id: 2,
                value: '-2520',
                correct: true
            },
            {
                id: 3,
                value: '4460',
                correct: false
            }]
    }, {
        question: '-17 x (-20)',
        answers: [
            {
                id: 0,
                value: '340',
                correct: true
            },
            {
                id: 1,
                value: '-340',
                correct: false
            },
            {
                id: 2,
                value: '-37',
                correct: false
            },
            {
                id: 3,
                value: '-221',
                correct: false
            }]
    }, {
        question: '15 / (-3',
        answers: [
            {
                id: 0,
                value: '-45',
                correct: false
            },
            {
                id: 1,
                value: '45',
                correct: false
            },
            {
                id: 2,
                value: '5',
                correct: false
            },
            {
                id: 3,
                value: '-5',
                correct: true
            }]
    }, {
        question: '(-12) / (-4)',
        answers: [
            {
                id: 0,
                value: '3',
                correct: true
            },
            {
                id: 1,
                value: '16',
                correct: false
            },
            {
                id: 2,
                value: '48',
                correct: false
            },
            {
                id: 3,
                value: '-48',
                correct: false
            }]
    }, {
        question: '(-32) / (-1) - 17',
        answers: [
            {
                id: 0,
                value: '15',
                correct: true
            },
            {
                id: 1,
                value: 'Chaud',
                correct: false
            },
            {
                id: 2,
                value: '-15',
                correct: false
            },
            {
                id: 3,
                value: '284',
                correct: false
            }]
    }
]  
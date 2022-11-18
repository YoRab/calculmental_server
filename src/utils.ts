import { QCM } from "./constants";

export const createCode = (existingCodes: string[]) => {
  do {
    let code = `${Math.floor(Math.random() * 8 + 1)}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}`
    if (!existingCodes.includes(code)) {
      return code
    }
  } while (1)
}

const shuffle = <T extends unknown>(array: T[]) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const OPERATORS = ["+", "-", "x"];

export const createCalcul = () => {
  const opA = Math.floor(Math.random() * 100);
  const opB = Math.floor(Math.random() * 100);
  const opC = Math.floor(Math.random() * 3);

  let result;
  switch (opC) {
    case 0:
      result = opA + opB;
      break;
    case 1:
      result = opA - opB;
      break;
    case 2:
    default:
      result = opA * opB;
  }
  return { calcul: `${opA} ${OPERATORS[opC]} ${opB} = ?`, result };
};


export const createQuestionAndAnswers = (index: number) => {


  const bla = QCM[index]
  if (bla) return bla

  const { calcul, result } = createCalcul();
  const answers = shuffle([
    { id: 0, value: `${result}`, correct: true },
    { id: 1, value: `${Math.floor(Math.random() * 200 - 100)}`, correct: false },
    { id: 2, value: `${Math.floor(Math.random() * 200 - 100)}`, correct: false },
    { id: 3, value: `${Math.floor(Math.random() * 200 - 100)}`, correct: false },
  ])
  return { question: calcul, answers }
}



export interface Question {
  id: string;
  type: 'choice' | 'boolean' | 'analysis';
  text: string;
  options?: string[];
  correctAnswer: string | boolean;
  explanation: string;
  image?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  module: number;
  icon: string;
  questions: Question[];
}

export const LESSONS: Lesson[] = [
  {
    id: 'l1',
    module: 1,
    title: 'Podejrzany SMS',
    description: 'Jak rozpoznać fałszywą wiadomość od kuriera.',
    icon: 'mail',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        text: 'Otrzymujesz SMS: "Twoja paczka została wstrzymana z powodu niedopłaty 1.50 zł. Kliknij w link: bit.ly/falszywy-link". Co robisz?',
        options: [
          'Klikam i szybko dopłacam',
          'Ignoruję i usuwam wiadomość',
          'Odpisuję na SMS z pytaniem o co chodzi'
        ],
        correctAnswer: 'Ignoruję i usuwam wiadomość',
        explanation: 'Firmy kurierskie nigdy nie proszą o małe dopłaty przez podejrzane linki w SMSach. To najczęstsza metoda oszustwa!'
      },
      {
        id: 'q2',
        type: 'boolean',
        text: 'Prawda czy Fałsz: Banki często proszą o podanie hasła przez telefon lub SMS.',
        correctAnswer: false,
        explanation: 'Bank NIGDY nie prosi o podanie hasła, PINu ani kodów BLIK w wiadomościach ani podczas rozmowy telefonicznej.'
      }
    ]
  },
  {
    id: 'l2',
    module: 1,
    title: 'Telefon od Wnuczka',
    description: 'Obrona przed oszustwem na członka rodziny.',
    icon: 'phone',
    questions: [
      {
        id: 'q3',
        type: 'analysis',
        text: 'Dzwoni ktoś, podaje się za wnuczka i mówi, że miał wypadek i potrzebuje pieniędzy na kaucję. Co jest najbardziej podejrzane?',
        options: [
          'Głos brzmi inaczej (chrypka)',
          'Prośba o przekazanie gotówki kurierowi',
          'Obie powyższe odpowiedzi'
        ],
        correctAnswer: 'Obie powyższe odpowiedzi',
        explanation: 'Oszuści często tłumaczą zmieniony głos chorobą lub stresem. Nigdy nie przekazuj pieniędzy nieznajomym osobom, nawet jeśli twierdzą, że są wysłane przez rodzinę.'
      },
      {
        id: 'q3_2',
        type: 'choice',
        text: 'Co powinieneś zrobić po takim podejrzanym telefonie?',
        options: [
          'Natychmiast biec do banku',
          'Rozłączyć się i zadzwonić do wnuczka na jego znany numer',
          'Czekać na kuriera'
        ],
        correctAnswer: 'Rozłączyć się i zadzwonić do wnuczka na jego znany numer',
        explanation: 'Zawsze weryfikuj prośby o pieniądze, dzwoniąc bezpośrednio do osoby, która rzekomo potrzebuje pomocy.'
      }
    ]
  },
  {
    id: 'l3',
    module: 2,
    title: 'Twierdza Hasło',
    description: 'Jak stworzyć hasło nie do złamania.',
    icon: 'lock',
    questions: [
      {
        id: 'q4',
        type: 'choice',
        text: 'Które hasło jest najbezpieczniejsze?',
        options: [
          '123456',
          'Haslo2023!',
          'Kawa-Z-Mlekiem-2024#',
          'MojeImie'
        ],
        correctAnswer: 'Kawa-Z-Mlekiem-2024#',
        explanation: 'Długie hasła (tzw. passphrases) składające się z kilku słów, cyfr i znaków specjalnych są najtrudniejsze do złamania przez komputery.'
      },
      {
        id: 'q4_2',
        type: 'boolean',
        text: 'Czy bezpiecznie jest zapisywać hasła na kartce przyklejonej do monitora?',
        correctAnswer: false,
        explanation: 'Hasła powinny być trzymane w bezpiecznym miejscu, najlepiej w głowie lub w menedżerze haseł. Kartka przy monitorze to zaproszenie dla każdego.'
      }
    ]
  },
  {
    id: 'l4',
    module: 2,
    title: 'Bezpieczny Koszyk',
    description: 'Jak bezpiecznie kupować w internecie.',
    icon: 'shopping-cart',
    questions: [
      {
        id: 'q5',
        type: 'boolean',
        text: 'Czy kłódka obok adresu strony internetowej zawsze oznacza, że sklep jest w 100% bezpieczny?',
        correctAnswer: false,
        explanation: 'Kłódka oznacza tylko szyfrowanie połączenia. Oszuści też mogą mieć kłódkę! Sprawdzaj opinie o sklepie i jego regulamin.'
      },
      {
        id: 'q6',
        type: 'choice',
        text: 'Widzisz super ofertę: Nowy iPhone za 200 zł w nieznanym sklepie. Co o tym sądzisz?',
        options: [
          'Okazja życia, kupuję!',
          'To prawdopodobnie oszustwo (zbyt piękne, by było prawdziwe)',
          'Zależy od koloru telefonu'
        ],
        correctAnswer: 'To prawdopodobnie oszustwo (zbyt piękne, by było prawdziwe)',
        explanation: 'Nierealnie niskie ceny to najczęstsza przynęta oszustów. Jeśli cena jest drastycznie niższa niż u konkurencji, zachowaj czujność.'
      }
    ]
  },
  {
    id: 'l5',
    module: 3,
    title: 'E-mail od "Banku"',
    description: 'Rozpoznawanie fałszywych wiadomości e-mail.',
    icon: 'shield',
    questions: [
      {
        id: 'q7',
        type: 'choice',
        text: 'Dostajesz e-mail od "Twój Bank" z informacją: "Twoje konto zostało zablokowane. Zaloguj się tutaj, aby odblokować". Adres nadawcy to: bank@secure-verify-123.com. Co robisz?',
        options: [
          'Loguję się natychmiast',
          'Sprawdzam adres nadawcy - wygląda podejrzanie, więc kasuję',
          'Dzwonię na oficjalną infolinię banku'
        ],
        correctAnswer: 'Dzwonię na oficjalną infolinię banku',
        explanation: 'Banki nigdy nie przesyłają linków do logowania w e-mailach. Adres nadawcy też musi być dokładnie taki, jak oficjalna domena banku.'
      }
    ]
  }
];

const pages = [
  {
    id: "p01",
    type: "intro",
    chapter: "Welcome",
    title: "Case Study: The Carter Family",
    body: [
      "Today you're a medical student at Summit Family Clinic, shadowing Dr. Lee, a family doctor. Two kids from the Carter family need help.",
      "At each step, read the clues and make a decision. Use what you learned about medicines in class.",
    ],
    images: [
      {
        file: "hospital+waiting+room.jpg",
        alt: "A friendly family clinic waiting room",
      },
      {
        file: "dr-lee.png",
        alt: "Dr. Lee, a family doctor with a stethoscope",
      },
    ],
    callout: {
      label: "Dr. Lee says",
      text: "Real medical students learn by working right alongside doctors in clinics and hospitals. Let's see what you've got!",
    },
  },
  {
    id: "p02",
    type: "info",
    chapter: "Patient 1: Maya",
    title: "Meet Maya",
    body: [
      "Maya Carter, age 10, has had a very sore throat for two days. Her temperature is 101.8°F, and Dr. Lee sees red, swollen tonsils with white spots.",
      "Dr. Lee orders a rapid strep test: a quick throat swab with results in about 10 minutes. The result is **POSITIVE**. Maya has strep throat, which is caused by bacteria called *Streptococcus*.",
    ],
    image: {
      file: "maya-sore-throat.png",
      alt: "Maya, a 10-year-old girl, sitting on an exam table holding her sore throat",
    },
  },
  {
    id: "p03",
    type: "question",
    chapter: "Patient 1: Maya",
    title: "Choosing the Medicine",
    image: {
      file: "antibacterial-icon.png",
      alt: 'A bacterium with a red "no" symbol over it',
    },
    question: {
      prompt: "Strep throat is caused by bacteria. Which type of medicine should Dr. Lee choose?",
      options: [
        {
          id: "a",
          text: "An antiviral",
          correct: false,
          feedback: "Antivirals work on viruses. Strep throat is caused by bacteria, so an antiviral won't help.",
        },
        {
          id: "b",
          text: "An antibiotic",
          correct: true,
          feedback: "That's right! Antibiotics kill bacteria or stop them from growing.",
        },
        {
          id: "c",
          text: "An antihistamine",
          correct: false,
          feedback: "Antihistamines calm allergies. They don't kill germs.",
        },
        {
          id: "d",
          text: "No medicine; it will go away on its own",
          correct: false,
          feedback: "Strep throat needs an antibiotic. Without one, it can sometimes lead to serious problems, like rheumatic fever, which can damage the heart.",
        },
      ],
      explanation: "Antibiotics help people with strep throat get better faster, stop them from spreading it, and prevent serious problems later.",
    },
  },
  {
    id: "p04",
    type: "question",
    chapter: "Patient 1: Maya",
    title: "The Prescription",
    body: [
      "Dr. Lee prescribes **amoxicillin**, an antibiotic. She picks the exact dose based on how much Maya weighs and sends the order to the pharmacy. Maya will take it for 10 days.",
    ],
    image: {
      file: "prescription-bottle.png",
      alt: "A pharmacy prescription bottle with an Rx label",
    },
    question: {
      prompt: "Could Maya's dad have just bought amoxicillin off the shelf at the store?",
      options: [
        {
          id: "a",
          text: "Yes, it's an over-the-counter (OTC) medicine",
          correct: false,
          feedback: "Amoxicillin is not OTC. You need a doctor's order to get it.",
        },
        {
          id: "b",
          text: "No, it's a prescription medicine",
          correct: true,
          feedback: "Correct! Amoxicillin needs a doctor's order, and a pharmacist fills it.",
        },
        {
          id: "c",
          text: "Yes, but only for kids",
          correct: false,
          feedback: "Age doesn't change it. Amoxicillin is a prescription medicine for everyone.",
        },
        {
          id: "d",
          text: "Only if Maya has a fever",
          correct: false,
          feedback: "Having a fever doesn't change it. Amoxicillin always needs a prescription.",
        },
      ],
      explanation: "Antibiotics are prescription medicines. A doctor has to make sure the illness is really caused by bacteria and choose the right dose. A pharmacist, a medicine expert, then double-checks the prescription before handing it over.",
    },
  },
  {
    id: "p05",
    type: "question",
    chapter: "Patient 1: Maya",
    title: "Fever at Bedtime",
    body: [
      "That night, Maya's fever comes back. The antibiotic takes a day or two to make her feel better. Her dad finds four things in the medicine cabinet: **Tylenol** (acetaminophen), **aspirin**, **Benadryl**, and **leftover antibiotic pills** from Grandpa.",
    ],
    image: {
      file: "medicine-cabinet.png",
      alt: "A medicine cabinet with four different medicine bottles",
    },
    question: {
      prompt: "Which one is the safe choice for Maya's fever tonight, with her dad giving the right dose?",
      options: [
        {
          id: "a",
          text: "Tylenol (acetaminophen)",
          correct: true,
          feedback: "Yes! Tylenol is an OTC medicine that lowers fever and eases pain. A grown-up should give it, following the label.",
        },
        {
          id: "b",
          text: "Aspirin",
          correct: false,
          feedback: "Kids and teens should NOT take aspirin unless a doctor says so. In kids, it can cause Reye's syndrome, a rare but very serious illness that harms the liver and brain.",
        },
        {
          id: "c",
          text: "Benadryl",
          correct: false,
          feedback: "Benadryl is an antihistamine. It calms allergies but doesn't treat fever.",
        },
        {
          id: "d",
          text: "Grandpa's leftover antibiotics",
          correct: false,
          feedback: "Never take someone else's prescription. It may be the wrong medicine and the wrong dose.",
        },
      ],
      explanation: "A fever reducer helps Maya feel better while her antibiotic kills the bacteria. Even OTC medicine should always be given by a trusted adult.",
    },
    callout: {
      label: "Safety Note",
      text: "Medicine is never candy. Only take medicine from a parent or trusted adult.",
    },
  },
  {
    id: "p06",
    type: "question",
    chapter: "Patient 1: Maya",
    title: "Brand Name or Generic?",
    body: [
      "The Tylenol runs out, so Dad buys a cheaper store-brand bottle labeled **\"Acetaminophen.\"** He's worried it isn't the same.",
    ],
    image: {
      file: "brand-vs-generic.png",
      alt: "A brand-name Tylenol box next to a store-brand acetaminophen bottle",
    },
    question: {
      prompt: "Is the store-brand bottle the same medicine as Tylenol?",
      options: [
        {
          id: "a",
          text: "Yes. Acetaminophen is the generic name, and Tylenol is a brand name",
          correct: true,
          feedback: "Exactly! Tylenol is the brand name on the box. Acetaminophen is the medicine's real name.",
        },
        {
          id: "b",
          text: "No, generic medicine is weaker",
          correct: false,
          feedback: "Generic medicine isn't weaker. It has the same medicine inside and works the same way.",
        },
        {
          id: "c",
          text: "No, acetaminophen is an antibiotic",
          correct: false,
          feedback: "Acetaminophen is a pain and fever reliever, not an antibiotic.",
        },
        {
          id: "d",
          text: "Only grown-ups can take generic medicine",
          correct: false,
          feedback: "Generic medicines are for everyone. The label gives the right dose for each age.",
        },
      ],
      explanation: "In the United States, the FDA requires generic medicines to have the same active ingredient and strength as the brand-name version and to work the same way. Generics usually cost less.",
    },
  },
  {
    id: "p07",
    type: "question",
    chapter: "Patient 1: Maya",
    title: "Feeling Better",
    body: [
      "On day 4, Maya feels much better. She asks, \"Can I stop taking the amoxicillin now?\"",
    ],
    image: {
      file: "maya-better.png",
      alt: "Maya smiling and feeling better",
    },
    question: {
      prompt: "What should Maya do?",
      options: [
        {
          id: "a",
          text: "Stop now, because she feels better",
          correct: false,
          feedback: "Feeling better doesn't mean all the bacteria are gone. Stopping early can let them come back.",
        },
        {
          id: "b",
          text: "Keep taking it exactly as Dr. Lee said, for all 10 days",
          correct: true,
          feedback: "Correct! Antibiotics should be taken exactly the way the doctor says, even after you feel better.",
        },
        {
          id: "c",
          text: "Save the rest for the next time she gets sick",
          correct: false,
          feedback: "Leftover antibiotics should never be saved. The next illness might be a virus or need a different medicine.",
        },
        {
          id: "d",
          text: "Give the leftover medicine to her brother",
          correct: false,
          feedback: "Never share prescription medicine. It was chosen just for Maya.",
        },
      ],
      explanation: "When antibiotics are used the wrong way, the toughest bacteria can survive and grow into \"superbugs\" that antibiotics can't kill anymore. Taking them correctly keeps them working for everyone.",
    },
  },
  {
    id: "p08",
    type: "question",
    chapter: "Patient 2: Leo",
    title: "Meet Leo",
    body: [
      "A week later, Maya's brother Leo, age 7, suddenly gets a 103°F fever, chills, body aches and a cough. A nose swab shows he has **influenza (the flu)**, which is caused by a virus.",
    ],
    image: {
      file: "leo-flu.png",
      alt: "Leo, a 7-year-old boy, in bed with a thermometer and tissues",
    },
    question: {
      prompt: "Maya says, \"Leo should take some of my amoxicillin. It made me better!\" Is she right?",
      options: [
        {
          id: "a",
          text: "Yes, it worked for Maya so it will work for Leo",
          correct: false,
          feedback: "Amoxicillin worked for Maya because strep is caused by bacteria. The flu is a virus, so it won't help Leo.",
        },
        {
          id: "b",
          text: "No. The flu is caused by a virus, and antibiotics only kill bacteria",
          correct: true,
          feedback: "Right! Antibiotics don't work on viruses, and sharing prescription medicine is never safe.",
        },
        {
          id: "c",
          text: "Yes, if he takes a smaller amount",
          correct: false,
          feedback: "A smaller amount won't help either. Antibiotics don't work on viruses at all.",
        },
        {
          id: "d",
          text: "No, because antibiotics only work on adults",
          correct: false,
          feedback: "Kids take antibiotics too, like Maya did. The real reason is that the flu is a virus.",
        },
      ],
      explanation: "This is one of the most important ideas in medicine: antibiotics treat bacteria, not viruses.",
    },
  },
  {
    id: "p09",
    type: "question",
    chapter: "Patient 2: Leo",
    title: "Fighting the Flu Virus",
    image: {
      file: "antiviral-icon.png",
      alt: 'A virus with a red "no" symbol over it',
    },
    question: {
      prompt: "Which medicine might Dr. Lee prescribe to fight Leo's flu virus?",
      options: [
        {
          id: "a",
          text: "Amoxicillin",
          correct: false,
          feedback: "Amoxicillin is an antibiotic. It kills bacteria, not viruses.",
        },
        {
          id: "b",
          text: "Tamiflu",
          correct: true,
          feedback: "Correct! Tamiflu is an antiviral. It slows the flu virus down so it can't copy itself as fast.",
        },
        {
          id: "c",
          text: "Benadryl",
          correct: false,
          feedback: "Benadryl is an antihistamine for allergies. It doesn't fight viruses.",
        },
        {
          id: "d",
          text: "Insulin",
          correct: false,
          feedback: "Insulin is a medicine for diabetes. It doesn't fight germs.",
        },
      ],
      explanation: "Tamiflu works best when it's started within about 2 days of getting sick. Leo should rest, drink fluids, and stay home until his fever has been gone for at least 24 hours without fever medicine.",
    },
    callout: {
      label: "Dr. Lee says",
      text: "Matching the medicine to the germ is one of the first things every doctor learns. Bacteria get antibiotics. Viruses may get antivirals.",
    },
  },
  {
    id: "p10",
    type: "summary",
    chapter: "Case Closed",
    title: "Case closed",
    image: {
      file: "case-closed.png",
      alt: 'A "Case Closed" badge with a stethoscope',
    },
  },
];

export default pages;

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('calculator_formulas', [
      {
        level : 'plant',
        formula_script : "var Count; Count = 1; while (Count <= 3) { window.alert('Hello World!'); Count = Count + 1; } Count = 1; while (Count <= 3) { window.alert('Hello World!'); Count = Count + 1; }",
        formula_xml : `<?xml version="1.0" encoding="UTF-8"?> <note> <to>Tove</to> <from>Jani</from> <heading>Reminder</heading> <body>Don't forget me this weekend!</body> </note>`,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        level : 'line',
        level_reference_id: 1,
        formula_script : "var Count; Count = 1; while (Count <= 3) { window.alert('Hello World!'); Count = Count + 1; } Count = 1; while (Count <= 3) { window.alert('Hello World!'); Count = Count + 1; }",
        formula_xml : `<?xml version="1.0" encoding="UTF-8"?> <note> <to>Tove</to> <from>Jani</from> <heading>Reminder</heading> <body>Don't forget me this weekend!</body> </note>`,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        level : 'sector',
        level_reference_id: 1,
        formula_script : "var Count; Count = 1; while (Count <= 3) { window.alert('Hello World!'); Count = Count + 1; } Count = 1; while (Count <= 3) { window.alert('Hello World!'); Count = Count + 1; }",
        formula_xml : `<?xml version="1.0" encoding="UTF-8"?> <note> <to>Tove</to> <from>Jani</from> <heading>Reminder</heading> <body>Don't forget me this weekend!</body> </note>`,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        level : 'machine',
        formula_script : "var Count; Count = 1; while (Count <= 3) { window.alert('Hello World!'); Count = Count + 1; } Count = 1; while (Count <= 3) { window.alert('Hello World!'); Count = Count + 1; }",
        level_reference_id: 1,
        formula_xml : `<?xml version="1.0" encoding="UTF-8"?> <note> <to>Tove</to> <from>Jani</from> <heading>Reminder</heading> <body>Don't forget me this weekend!</body> </note>`,
        createdAt : new Date(),
        updatedAt : new Date()
      }
    ]);  
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('calculator_formulas')
  }
};

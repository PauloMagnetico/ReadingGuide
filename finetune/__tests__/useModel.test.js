const { useModel } = require('../src/useModel.js');

test('Model should correctly evaluate text difficulty', async () => {
    const modelResponse = await useModel('dit is een makkelijke tekst');
    expect(modelResponse).toBe('avigrade = AviStart');
  });
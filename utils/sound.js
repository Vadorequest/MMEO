import { Audio } from 'expo';

export const play = async (file) => {
  const soundObject = new Audio.Sound();

  try {
    await soundObject.loadAsync(file);
    await soundObject.playAsync();
    console.log(`Sound ${file} is playing`);
  } catch (error) {
    console.error(error);
  }

  return soundObject;
};

export const randomPlay = async (files) => {
  const i = getRandomInt(files.length);
  return await play(files[i]);
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

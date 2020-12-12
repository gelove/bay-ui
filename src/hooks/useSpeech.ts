import { useState, useEffect, useCallback } from 'react';

export type ISpeechOptions = {
  voice: SpeechSynthesisVoice;
  lang: string;
  rate: number;
  pitch: number;
  volume: number;
};

export type SpeechOptions = Partial<ISpeechOptions>;

type Status = 'play' | 'pause' | 'end';

export type SpeechState = {
  /**
   * @deprecated `isPlaying` has been deprecated and replaced by `status` instead.
   */
  isPlaying?: boolean;
  status?: Status;
};

// const voices =
//   typeof window === 'object' && typeof window.speechSynthesis === 'object' ? window.speechSynthesis.getVoices() : [];

const defaultOptions: SpeechOptions = {
  // voice: voices[0],
  lang: 'default',
  rate: 1,
  pitch: 1,
  volume: 1,
};

const useSpeech = (text: string, opts: SpeechOptions = defaultOptions): SpeechState => {
  const [state, setState] = useState<SpeechState>({});

  const handlePlay = useCallback(
    () =>
      setState(preState => {
        return { ...preState, isPlaying: true, status: 'play' };
      }),
    []
  );

  const handlePause = useCallback(
    () =>
      setState(preState => {
        return { ...preState, isPlaying: false, status: 'pause' };
      }),
    []
  );

  const handleEnd = useCallback(
    () =>
      setState(preState => {
        return { ...preState, isPlaying: false, status: 'end' };
      }),
    []
  );

  useEffect(() => {
    const utterance = new SpeechSynthesisUtterance(text);
    opts.lang && (utterance.lang = opts.lang);
    opts.voice && (utterance.voice = opts.voice);
    utterance.rate = opts.rate || 1;
    utterance.pitch = opts.pitch || 1;
    utterance.volume = opts.volume || 1;
    utterance.onstart = handlePlay;
    utterance.onpause = handlePause;
    utterance.onresume = handlePlay;
    utterance.onend = handleEnd;
    window.speechSynthesis.speak(utterance);
  }, []);

  return state;
};

export default useSpeech;

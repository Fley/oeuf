export type UnexpectedError = any;

type StepAbstract = {
  id: string;
  rest: number;
  done: boolean;
};

export type StepRepetition = StepAbstract & {
  kg: number;
  repetition: number;
};

export type StepTimed = StepAbstract & {
  duration: number;
};

export type Step = StepRepetition | StepTimed;

export type StepType = 'timed' | 'repetition';

export type ProgressStatus = 'running' | 'stopped' | 'finished';
export type Progress = {
  status: ProgressStatus;
  startedAt: Date;
};

export type Exercise = {
  id: string;
  name: string;
  type: StepType | null;
  steps: Step[];
  done: boolean;
  progress: Progress | null;
};

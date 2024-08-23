import { useState } from 'react';
import {
  formatShortDate,
  GameErrorInterface,
  validateGameInput,
  validateScoreline,
} from '../util/helper';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { IContext } from './Root';
import { IGame } from '../util/data';
import usePageTitle from '../util/usePageTitle';

export default function AddGame() {
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [date, setDate] = useState('');
  const [multiplier, setMultiplier] = useState('');
  const [outcome, setOutcome] = useState<
    '' | 'team1' | 'team2' | 'draw' | 'later'
  >('');
  const [finalScore, setFinalScore] = useState('');
  const [firstGoalScorer, setFirstGoalScorer] = useState('');

  const [errors, setErrors] = useState<GameErrorInterface>({});

  const { data, setData } = useOutletContext<IContext>();
  const navigator = useNavigate();
  usePageTitle('Add game');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Validate all state variables
    const errorObj: GameErrorInterface = validateGameInput({
      team1,
      team2,
      date,
      outcome,
      finalScore,
      firstGoalScorer,
    });

    setErrors(errorObj);
    if (Object.keys(errorObj).length > 0) return;

    // Double check
    if (outcome !== 'draw' && validateScoreline(finalScore, true)) {
      const question = confirm(
        `Are you sure that ${eval(outcome)} won on penalties?`
      );
      if (question === false) {
        return;
      }
    }
    // Change data state

    // this line prevents ts error, this line will never  get executed because we dealt with this earlier
    if (outcome === '') return;

    // if we have a final score, and its not 0-0, we need a first goal scorer.
    // if it is 0-0, fgs = null
    // if no final score, fgs = undefined
    let fgs: string | null | undefined;
    if (finalScore.trim().length > 0 && finalScore.trim() !== '0-0') {
      fgs = firstGoalScorer.trim();
    } else if (finalScore.trim() === '0-0') {
      fgs = null;
    } else {
      fgs = undefined;
    }

    const newId = (data.slice(-1)[0] && data.slice(-1)[0].id + 1) || 1;
    const newGame: IGame = {
      discriminator: 'I-G-A-M-E-0101',
      id: newId,
      team1: team1.trim(),
      team2: team2.trim(),
      date: date.trim(),
      outcome: outcome === 'later' ? undefined : outcome,
      formattedDate: formatShortDate(new Date(date)),
      multiplier: multiplier === '' ? 1 : +multiplier,
      finalScore: finalScore.trim() === '' ? undefined : finalScore.trim(),
      firstGoalScorer: fgs,
      predictions: [],
    };

    setData((prev) => [...prev, newGame]);
    // Redirect user

    navigator('/');
  }

  return (
    <div className="add-page form-page">
      <form className="big-form" onSubmit={handleSubmit}>
        <h1>Add new game for prediction</h1>
        <label>
          <span>Team 1 name*</span>
          <input
            type="text"
            name="team1"
            value={team1}
            onChange={(e) => {
              errors.team1Error = undefined;
              return setTeam1(e.target.value);
            }}
          />
          {errors && errors.team1Error && <p>{errors.team1Error}</p>}
        </label>
        <label>
          <span>Team 2 name*</span>
          <input
            type="text"
            name="team2"
            value={team2}
            onChange={(e) => {
              errors.team2Error = undefined;
              return setTeam2(e.target.value);
            }}
          />
          {errors && errors.team2Error && <p>{errors.team2Error}</p>}
        </label>
        <label>
          <span>Date*</span>
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => {
              errors.dateError = undefined;
              return setDate(e.target.value);
            }}
          />
          {errors && errors.dateError && <p>{errors.dateError}</p>}
        </label>
        <label>
          <span>Multiplier</span>
          <input
            type="number"
            name="multiplier"
            placeholder="default value: 1"
            min={1}
            value={multiplier}
            onChange={(e) => {
              errors.multiplierError = undefined;
              return setMultiplier(e.target.value);
            }}
          />
          {errors && errors.multiplierError && <p>{errors.multiplierError}</p>}
        </label>
        {team1 && team2 && (
          <label>
            <span>Outcome</span>
            <select
              name="outcome"
              value={outcome}
              onChange={(e) => {
                if (
                  e.target.value === 'team1' ||
                  e.target.value === 'team2' ||
                  e.target.value === 'draw' ||
                  e.target.value === 'later'
                ) {
                  return setOutcome(e.target.value);
                } else {
                  return setOutcome('');
                }
              }}
            >
              <option value="">-- select --</option>
              <option value="team1">{team1} win</option>
              <option value="draw">Draw</option>
              <option value="team2">{team2} win</option>
              <option value="later">Choose later</option>
            </select>
            {errors && errors.outcomeError && <p>{errors.outcomeError}</p>}
          </label>
        )}
        {outcome && outcome !== 'later' && (
          <label>
            <span>Final score</span>
            <input
              type="text"
              name="finalScore"
              value={finalScore}
              onChange={(e) => {
                errors.finalScoreError = undefined;
                return setFinalScore(e.target.value);
              }}
            />
            {errors && errors.finalScoreError && (
              <p>{errors.finalScoreError}</p>
            )}
          </label>
        )}
        {finalScore !== '0-0' && validateScoreline(finalScore) && (
          <label>
            <span>First goal scorer*</span>
            <input
              type="text"
              name="firstGoalScorer"
              value={firstGoalScorer}
              onChange={(e) => {
                errors.firstGoalScorerError = undefined;
                setFirstGoalScorer(e.target.value);
              }}
            />
            {errors && errors.firstGoalScorerError && (
              <p>{errors.firstGoalScorerError}</p>
            )}
          </label>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

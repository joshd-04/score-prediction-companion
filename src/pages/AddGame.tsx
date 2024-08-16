import { useState } from 'react';
import { formatShortDate, validateScoreline } from '../util/helper';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { IContext } from './Root';
import { IGame } from '../util/data';
import usePageTitle from '../util/usePageTitle';

export interface errorInterface {
  team1Error?: string;
  team2Error?: string;
  dateError?: string;
  multiplierError?: string;
  outcomeError?: string;
  finalScoreError?: string;
  firstGoalScorerError?: string;
  genericError?: string;
}

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

  const [errors, setErrors] = useState<errorInterface>({});

  const { data, setData } = useOutletContext<IContext>();
  const navigator = useNavigate();
  usePageTitle('Add game');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Validate all state variables
    const errorObj: errorInterface = {};

    if (team1.length === 0) {
      errorObj.team1Error = 'This field is required';
    }

    if (team2.length === 0) errorObj.team2Error = 'This field is required';

    if (date.length === 0) errorObj.dateError = 'This field is required';

    if (outcome === '') errorObj.outcomeError = 'This field is required';

    if (finalScore.length === 0 && outcome !== 'later')
      errorObj.finalScoreError = 'This field is required';

    if (
      finalScore.length > 0 &&
      !validateScoreline(finalScore) &&
      outcome !== 'later'
    )
      errorObj.finalScoreError = `Invalid format, enter a score e.g 2-0, 2-2, 0-2.
      Use a hyphen to separate scores`;

    if (
      finalScore !== '0-0' &&
      validateScoreline(finalScore) &&
      firstGoalScorer.length === 0 &&
      outcome !== 'later'
    )
      errorObj.firstGoalScorerError = 'This field is required';

    if (outcome === 'draw' && !validateScoreline(finalScore, true)) {
      errorObj.finalScoreError = 'This score does not resemble a draw';
    }

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
    console.log(date);

    // this line prevents ts error, this line will never  get executed because we dealt with this earlier
    if (outcome === '') return;

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
      finalScore: finalScore.trim(),
      firstGoalScorer:
        firstGoalScorer.length === 0 ? null : firstGoalScorer.trim(),
      predictions: [],
    };

    setData((prev) => [...prev, newGame]);
    console.log(newGame.id);

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

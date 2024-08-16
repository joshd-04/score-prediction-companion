import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import NotFound from './NotFound';
import { IContext } from './Root';
import { usernameIsUnique, validateScoreline } from '../util/helper';
import { IPrediction } from '../util/data';
import { ErrorInterface } from './AddPrediction';

export default function EditPrediction() {
  const [username, setUsername] = useState('');
  const [outcome, setOutcome] = useState<'' | 'team1' | 'team2' | 'draw'>('');
  const [finalScore, setFinalScore] = useState('');
  const [firstGoalScorer, setFirstGoalScorer] = useState<string | null>(null);

  const [errors, setErrors] = useState<ErrorInterface>({});

  const { gameId, username: user } = useParams();
  const { data, setData } = useOutletContext<IContext>();
  const navigator = useNavigate();

  useEffect(() => {
    handleReset();
  }, []);

  if (user === undefined || gameId === undefined) return <NotFound />;

  const game = data.find((game) => game.id === +gameId);
  if (game === undefined) return <NotFound />;

  const originalPrediction = game.predictions.find(
    (pred: IPrediction) => pred.username.toLowerCase() === user.toLowerCase()
  );
  if (originalPrediction === undefined) return <NotFound />;

  function handleReset() {
    if (originalPrediction === undefined) return <NotFound />;
    setUsername(originalPrediction.username);
    setOutcome(originalPrediction.outcome);
    setFinalScore(originalPrediction.finalScore);
    setFirstGoalScorer(originalPrediction.firstGoalScorer);
  }

  function handleCancel() {
    navigator(-1);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errorObj: ErrorInterface = {};
    if (game === undefined) return;
    if (originalPrediction === undefined) return;

    console.log(usernameIsUnique(username, game.predictions));

    // validate
    if (username.length === 0)
      errorObj.usernameError = 'This field is required';
    if (
      username !== originalPrediction.username &&
      !usernameIsUnique(username, game.predictions)
    )
      errorObj.usernameError = 'This user already has a prediction';
    if (outcome === '') errorObj.outcomeError = 'This field is required';
    if (finalScore === '') errorObj.finalScoreError = 'This field is required';
    if (
      validateScoreline(finalScore) &&
      !firstGoalScorer &&
      finalScore !== '0-0'
    )
      errorObj.firstGoalScorerError = 'This field is required';
    if (outcome === 'draw' && !validateScoreline(finalScore, true))
      errorObj.finalScoreError = 'This score does not resemble a draw';

    setErrors(errorObj);
    if (Object.keys(errorObj).length > 0) return;

    if (validateScoreline(finalScore, true) && outcome !== 'draw') {
      if (game === undefined) return;
      const team = outcome === 'team1' ? game.team1 : game.team2;
      const question = confirm(
        `Are you sure you predict ${team} to win on penalties?`
      );
      if (!question) return;
    }

    if (outcome === '' || gameId === undefined) return; // prevent ts error
    const updatedPrediction: IPrediction = {
      username: username.trim(),
      outcome: outcome,
      finalScore: finalScore.trim(),
      firstGoalScorer: firstGoalScorer
        ? firstGoalScorer.trim()
        : firstGoalScorer,
    };

    const updatedPredictions = game.predictions.map((pred) => {
      return pred === originalPrediction ? updatedPrediction : pred;
    });

    const updatedData = data.map((game) => {
      return game.id !== +gameId
        ? game
        : { ...game, predictions: updatedPredictions };
    });

    setData(updatedData);
    navigator(`/game/${gameId}`);
  }

  return (
    <>
      <div className="modal-blur">
        <form
          className="big-form"
          onSubmit={(e) => handleSubmit(e)}
          style={{ background: 'var(--blue-linear)' }}
        >
          <h1>Edit prediction</h1>
          <label>
            <span>Username*</span>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => {
                errors.usernameError = undefined;
                return setUsername(e.target.value);
              }}
            />
            {errors && errors.usernameError && <p>{errors.usernameError}</p>}
          </label>
          <label>
            <span>Outcome*</span>
            <select
              name="outcome"
              value={outcome}
              onChange={(e) => {
                errors.outcomeError = undefined;
                if (
                  e.target.value === 'team1' ||
                  e.target.value === 'team2' ||
                  e.target.value === 'draw'
                )
                  return setOutcome(e.target.value);
                return setOutcome('');
              }}
            >
              <option value="">-- select --</option>
              <option value="team1">{game.team1}</option>
              <option value="draw">Draw</option>
              <option value="team2">{game.team2}</option>
            </select>
            {errors && errors.outcomeError && <p>{errors.outcomeError}</p>}
          </label>
          <label>
            <span>Final score*</span>
            <input
              type="text"
              name="finalScore"
              value={finalScore}
              onChange={(e) => {
                errors.finalScoreError = undefined;
                if (e.target.value.trim() === '0-0') setFirstGoalScorer(null);
                return setFinalScore(e.target.value);
              }}
            />
            {errors && errors.finalScoreError && (
              <p>{errors.finalScoreError}</p>
            )}
          </label>
          {validateScoreline(finalScore) && finalScore !== '0-0' && (
            <label>
              <span>First goal-scorer*</span>
              <input
                type="text"
                name="firstGoalScorer"
                value={firstGoalScorer || ''}
                onChange={(e) => {
                  errors.firstGoalScorerError = undefined;
                  return setFirstGoalScorer(e.target.value);
                }}
              />
              {errors && errors.firstGoalScorerError && (
                <p>{errors.firstGoalScorerError}</p>
              )}
            </label>
          )}
          <button type="submit">Submit</button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>

          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </>
    // </div>
  );
}

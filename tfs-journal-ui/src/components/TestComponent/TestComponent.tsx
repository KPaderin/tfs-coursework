import { setModerateStatus } from '../../services/setModerateStatus';

interface Props {
  userId?: string;
}
/**
 * Комопонент исключительно для тестов, без стилей и прочего, можно смело выпиливать
 * */
function TestComponent({ userId }: Props) {
  const moderateHandler = () => {
    setModerateStatus('admin')
      .then(() => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      })
      .catch(console.log);
  };

  const unModerateHandler = () => {
    setModerateStatus('user')
      .then(() => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      })
      .catch(console.log);
  };
  return (
    <>
      <button onClick={moderateHandler}>Стать модератором</button>
      <button onClick={unModerateHandler}>Перестать быть модератором</button>
    </>
  );
}

export default TestComponent;

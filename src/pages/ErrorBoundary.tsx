import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom';
import { Result, Button } from 'antd';

export default function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  let errorMessage = 'An unexpected error occurred';
  let errorStatus: 'error' | '404' | '403' | '500' = 'error';

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText;
    if (error.status === 404) {
      errorStatus = '404';
    } else if (error.status === 403) {
      errorStatus = '403';
    } else if (error.status === 500) {
      errorStatus = '500';
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  console.error('Route error:', error);

  return (
    <Result
      status={errorStatus}
      title="Oops! Something went wrong."
      subTitle={errorMessage}
      extra={[
        <Button key="home" type="primary" onClick={() => navigate('/')}>
          Go to Home
        </Button>,
        <Button key="back" onClick={() => navigate(-1)}>
          Go Back
        </Button>,
      ]}
    />
  );
}
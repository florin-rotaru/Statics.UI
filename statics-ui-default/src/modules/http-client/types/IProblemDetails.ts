import IText from 'src/types/IText';

export default interface ProblemDetails {
  type?: string | null;
  typeArguments?: Record<string, unknown> | null;
  title?: IText | null;
  messages?: IText | null;
}

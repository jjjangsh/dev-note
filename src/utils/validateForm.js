const BLANK_REGEX = /^\s*$/;
const ERROR_TYPES = ['tech_stack', 'date'];

const validatePostForm = (input) => {
  const errors = [];
  let isValid = true;

  if (BLANK_REGEX.test(input.tech_stack)) {
    isValid = false;
    errors.push({
      type: ERROR_TYPES[0],
      message: '기술스택을 1개 이상 입력해주세요.'
    });
  }

  if (!input.project_end_date || !input.project_start_date) {
    isValid = false;
    errors.push({
      type: ERROR_TYPES[1],
      message: '프로젝트 진행 시기를 정확히 입력해주세요.'
    });
  }

  const start_date = input.project_start_date.split('-').join('');
  const end_date = input.project_end_date.split('-').join('');
  if (+start_date > +end_date) {
    isValid = false;
    errors.push({
      type: ERROR_TYPES[1],
      message: '프로젝트 시작 날짜는 마감 날짜보다 이전이어야 합니다.'
    });
  }

  return { isValid, errors };
};

export default validatePostForm;

import * as Yup from 'yup';

const schemaBookmarkCreate = Yup.object().shape({
  name: Yup.string().required(),
  url: Yup.string().url().required(),
  user_id: Yup.string().required(),
  folder_id: Yup.string(),
});

const schemaBookmarkUpdate = Yup.object().shape({
  id: Yup.string().required(),
  name: Yup.string().required(),
  url: Yup.string().url().required(),
});

export { schemaBookmarkCreate, schemaBookmarkUpdate };

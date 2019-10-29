export default values => {
  const submittingValues = { ...values };

  if (submittingValues.tags) {
    submittingValues.tag_pids = submittingValues.tags.map(tag => tag.pid);
  }

  delete submittingValues.tags;
  delete submittingValues.circulation;
  delete submittingValues.eitems;
  delete submittingValues.items;
  delete submittingValues.relations;
  delete submittingValues._access;

  return submittingValues;
};

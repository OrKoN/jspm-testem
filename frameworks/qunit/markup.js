export default () => {
  const target = document.getElementById('target');
  target.id = 'qunit';

  var div = document.createElement('div');
  document.body.appendChild(div);
  div.id = 'qunit-fixtures';
};

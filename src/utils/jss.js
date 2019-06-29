import jss from 'jss'
import preset from 'jss-preset-default'
jss.setup(preset());

const createStyleSheet = styles => jss.createStyleSheet(styles).attach().classes;

export { createStyleSheet }
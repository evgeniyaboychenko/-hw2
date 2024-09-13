const propNames = new Set(['id', 'className', 'textContent', 'onclick']);
const ruOrdinalRules = new Intl.PluralRules("ru-RU", { type: "cardinal" });
const suffixes = new Map([
  ["one", ""],
  ["few", "а"],
  ["many", ""],
  ["other", ""],
]);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

// определяем окончание в зависимости от числа
export const formatOrdinals = (n) => {
  const rule = ruOrdinalRules.select(n);
  const suffix = suffixes.get(rule);
  return suffix;
};


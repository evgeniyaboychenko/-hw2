/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}


const setLevel = (array, lev) => {
  return array.map((item, ind) => {
      return {...item, level:  lev ?  lev + '' + ind : ind + ''};
  })
}

export function sortCategoryList (categoryList) {
  let resultArray = [];
  const parents = categoryList.filter((item) => item.parent === null);
  const newParents = setLevel(parents);
  resultArray =  resultArray.concat(newParents);

  const defineNesting = (parentsAll) => {
    parentsAll.forEach((element,) => {
    const childrens = setLevel(categoryList.filter((item) => {
      if(item.parent && item.parent._id===element._id)
        return true
    }), element.level );

    if(childrens.length!==0) {
      resultArray =resultArray.concat(childrens);
      defineNesting(childrens);
      }
      else return;
    });
  }

  defineNesting(newParents);

  const listFiltered = resultArray.sort((a, b) => {
    if (a.level > b.level) {
      return 1;
    }
    if (a.level < b.level) {
      return -1;
    }
    return 0;
  });

  const resultList = listFiltered.map(item=> ({
    value: item._id,
    title: "- ".repeat(item.level.length-1) + item.title
  }));
  resultList.unshift({ value: '', title: 'Все' });
  return resultList
}

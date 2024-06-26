Контрольные вопросы

1. Какие примитивные типы данных существуют в JavaScript?

Примитивные типы данных в JavaScript — это основные виды информации, которые программа может использовать для хранения и работы с данными.

Числа (Numbers) - числовой тип данных используется для представления чисел.
Строки (Strings) - строковый тип данных используется для хранения текста. 
Логические значения (Booleans) - логический тип данных может принимать только два значения: true (истина) или false (ложь).
Undefined - тип undefined означает, что переменная была объявлена, но ей не было присвоено никакого значения. 
Null - тип null используется для представления отсутствия значения. Он обычно присваивается переменной явно для указания на отсутствие данных.
Символы (Symbols) - символьный тип данных в JavaScript. Каждый символ является уникальным и неизменным. 

2. Какие методы массивов вы использовали для обработки и анализа данных в вашем приложении, и как они помогли в выполнении задачи?

filter() (фильтрация элементов массива) - метод filter() используется для создания нового массива, содержащего элементы исходного массива, которые прошли определенное условие (предикат). 
reduce() (агрегация элементов массива) - метод reduce() используется для вычисления единственного значения на основе элементов массива. 
forEach() (итерация по элементам массива) - метод forEach() используется для выполнения указанной функции один раз для каждого элемента массива. 
find() (поиск элемента в массиве) - метод find() используется для поиска первого элемента в массиве, удовлетворяющего заданному условию. 
map() (трансформация элементов массива) - метод map() используется для создания нового массива на основе результатов вызова функции для каждого элемента исходного массива.

3. В чем состоит роль конструктора класса?

Роль конструктора класса в JavaScript заключается в инициализации новых экземпляров класса при их создании. Конструктор класса выполняет следующие основные задачи:
Инициализация свойств экземпляра класса - конструктор класса используется для установки начальных значений свойств (переменных) нового объекта, созданного на основе этого класса. В конструкторе вы можете присваивать значения переданным параметрам или устанавливать значения по умолчанию.
Инициализация других настроек или ресурсов - конструктор класса может также выполнять другие операции и инициализировать другие ресурсы, необходимые для работы объекта. Например, это может включать инициализацию массивов, объектов, подключение к базе данных и т. д.
Выполнение подготовительных действий перед использованием объекта - конструктор класса выполняется автоматически при создании нового экземпляра класса. Это позволяет выполнить необходимые действия перед тем, как объект будет использован в программе.
Получение и использование параметров при создании объекта - конструктор класса может принимать параметры, которые передаются при создании нового объекта. Эти параметры используются для инициализации свойств объекта.

4. Каким образом вы можете создать новый экземпляр класса в JavaScript?

В JavaScript для создания нового экземпляра класса используется ключевое слово new вместе с именем класса, за которым следуют аргументы, если они необходимы для конструктора класса.

// צעד 1: עדכון מצב הטופס
function updateForm() {
    // קבלת הערך של שדה השם
    var name = document.getElementById('name').value;
    // בדיקת אם נבחר פריט כלשהו
    var isItemSelected = isAnyChecked(['popcorn', 'drink', 'food']);
    // קבלת אלמנט כפתור השליחה
    var submitButton = document.getElementById('submitButton');
    // הפעלת או השבתת כפתור השליחה בהתאם
    submitButton.disabled = !(name !== "" && isItemSelected); 
    // הדגשת הפריטים שנבחרו
    highlightSelectedItems();
}

// צעד 2: בדיקת אם נבחר פריט כלשהו מהקטגוריות
function isAnyChecked(categories) {
    // מעבר על כל הקטגוריות
    for (var i = 0; i < categories.length; i++) {
        // קבלת כל האלמנטים בקטגוריה הנוכחית
        var elements = document.getElementsByName(categories[i]);
        // מעבר על כל האלמנטים בקטגוריה הנוכחית
        for (var j = 0; j < elements.length; j++) {
            // בדיקת אם האלמנט מסומן
            if (elements[j].checked) {
                // אם נמצא אלמנט מסומן, החזרה של true
                return true;
            }
        }
    }
    // אם לא נמצא אלמנט מסומן, החזרה של false
    return false;
}

// צעד 3: הדגשת הפריטים שנבחרו
function highlightSelectedItems() {
    // קבלת התמונות של הפריטים שנבחרו
    var selectedImgs = getSelectedImages();
    // קבלת כל הפריטים בתפריט
    var menuItems = document.getElementsByClassName('menu-item');
    // מעבר על כל הפריטים בתפריט
    for (var i = 0; i < menuItems.length; i++) {
        var isSelected = false;
        // בדיקת אם הפריט הנוכחי נבחר
        for (var j = 0; j < selectedImgs.length; j++) {
            if (selectedImgs[j] === menuItems[i].dataset.item) {
                isSelected = true;
                break;
            }
        }
        // הוספה או הסרה של מחלקת CSS שמדגישה את הפריט
        menuItems[i].classList.toggle('selected', isSelected);
    }
}

// צעד 4: קבלת התמונות של הפריטים שנבחרו
function getSelectedImages() {
    var selectedImgs = [];
    var categories = ['popcorn', 'drink', 'food'];
    // מעבר על כל הקטגוריות
    for (var i = 0; i < categories.length; i++) {
        var elements = document.getElementsByName(categories[i]);
        // מעבר על כל האלמנטים בקטגוריה הנוכחית
        for (var j = 0; j < elements.length; j++) {
            // בדיקת אם האלמנט מסומן
            if (elements[j].checked) {
                // הוספת התמונה למערך התמונות הנבחרות
                selectedImgs[selectedImgs.length] = elements[j].dataset.img;
            }
        }
    }
    // החזרת המערך עם כל התמונות שנבחרו
    return selectedImgs;
}

// צעד 5: שליחת הטופס והצגת סיכום ההזמנה
function submitForm(event) {
    // מניעת שליחה רגילה של הטופס
    event.preventDefault();
    // קבלת הפריטים שנבחרו
    var selectedItems = getSelectedItems();
    // קבלת הערך של שדה השם
    var name = document.getElementById('name').value;
    // קבלת הערך של שדה ההערות
    var comment = document.getElementById('comment').value;
    // קבלת תוכן החלון הקופץ
    var popupContent = document.getElementById('popupContent');
    // חיבור הפריטים שנבחרו למחרוזת אחת
    var selectedItemsString = selectedItems.join(', ');
    // הצגת סיכום ההזמנה בחלון הקופץ
    popupContent.innerHTML = 'הזמנתך כוללת: ' + selectedItemsString + '<br>שם: ' + name + '<br>הערות: ' + comment;
    // הצגת החלון הקופץ
    document.getElementById('popup').style.display = 'block';
    // ניקוי שדות הטופס
    clearFormFields();
}

// צעד 6: קבלת הפריטים שנבחרו בטופס
function getSelectedItems() {
    var selectedItems = [];
    var categories = ['popcorn', 'drink', 'food'];
    // מעבר על כל הקטגוריות
    for (var i = 0; i < categories.length; i++) {
        var elements = document.getElementsByName(categories[i]);
        // מעבר על כל האלמנטים בקטגוריה הנוכחית
        for (var j = 0; j < elements.length; j++) {
            // בדיקת אם האלמנט מסומן
            if (elements[j].checked) {
                // הוספת הערך של האלמנט למערך הפריטים הנבחרים
                selectedItems[selectedItems.length] = elements[j].value;
            }
        }
    }
    // החזרת המערך עם כל הפריטים שנבחרו
    return selectedItems;
}

// צעד 7: ניקוי כל השדות בטופס לאחר שליחת ההזמנה
function clearFormFields() {
    // ניקוי שדה השם
    document.getElementById('name').value = '';
    // ניקוי שדה ההערות
    document.getElementById('comment').value = '';
    var categories = ['popcorn', 'drink', 'food'];
    // מעבר על כל הקטגוריות
    for (var i = 0; i < categories.length; i++) {
        var elements = document.getElementsByName(categories[i]);
        // מעבר על כל האלמנטים בקטגוריה הנוכחית
        for (var j = 0; j < elements.length; j++) {
            // הסרת סימון מהאלמנטים המסומנים
            elements[j].checked = false;
        }
    }
    // הדגשת הפריטים שנבחרו
    highlightSelectedItems();
    // עדכון מצב הטופס
    updateForm();
}

// צעד 8: סגירת החלון הקופץ
function closePopup() {
    // שינוי הסגנון של החלון הקופץ כדי להסתיר אותו
    document.getElementById('popup').style.display = 'none';
}

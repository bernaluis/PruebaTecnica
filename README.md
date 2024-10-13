# PruebaTecnica

Usar archivo csv, es necesario crear una db de mysql previamente con el nombre de ips en localhost

//levantar la api
php artisan serve
//para el job de leer el csv en background, debe de estar on para funcionar
php artisan queue:work
# Navigation Bar

## How to use

### Maven

```
<dependency>
    <groupId>coffee.synyx</groupId>
    <artifactId>navigation-bar</artifactId>
    <version>${version}</version>
</dependency>
```

### Javascript

Just add the javascript dependencies of jquery, mustache and from the navigation.

```
<script src="/webjars/jquery/2.1.1/jquery.min.js"></script>
<script src="/webjars/mustachejs/2.2.1/mustache.min.js"></script>
<script src="/webjars/navigation-bar/${version}/navigation.js"></script>
```

### Html

Now just add the simple html snipped listed below where you want to show the CoffeeNet header

```
<!-- CoffeeNet header -->
<header id="coffeenet-header"></header>
```

## Development

### Build

```
mvn clean install
```

This command will trigger 'npm install' that will trigger webpack to convert the es2015 javascript file into es5.
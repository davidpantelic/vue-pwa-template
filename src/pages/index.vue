<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <main>
    <h1>Homepage <span class="text-3xl">v33</span></h1>
    <br />
    <div class="locale-changer">
      <select v-model="$i18n.locale">
        <option
          v-for="locale in $i18n.availableLocales"
          :key="`locale-${locale}`"
          :value="locale"
        >
          {{ locale }}
        </option>
      </select>
    </div>
    <br />
    <h2>{{ t("msg.hello") }}</h2>
    <p>{{ $d(new Date(), "time") }}</p>
    <p>{{ $d(new Date(), "short") }}</p>
    <p>{{ $d(new Date(), "long") }}</p>
    <p>{{ $d(new Date(), "numeric") }}</p>
    <i18n-d scope="global" tag="p" :value="new Date()"></i18n-d>
    <p>{{ $n(10000, "currency") }}</p>
    <i18n-n scope="global" tag="p" :value="100" format="currency"></i18n-n>
    <br />
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
      nostrum quibusdam repellat odio voluptatum vero distinctio, voluptatibus
      at eaque voluptate quod dolores ut eius animi voluptas quae sapiente sit
      mollitia!
    </p>

    <Divider />

    <SendTestPush />
  </main>
</template>

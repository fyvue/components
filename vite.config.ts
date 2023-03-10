import type { UserConfig } from "vite";
import copy from "rollup-plugin-copy";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import path from "path";

const config: UserConfig = {
  plugins: [
    vue(),
    Components({
      dts: "src/components.d.ts",
    }),
    // @ts-ignore
    copy({
      targets: [
        {
          src: "package.json",
          dest: "dist/",
          rename: "package.json",
          transform: (contents) => {
            // @ts-ignore
            let _contents = contents.toString().replaceAll("./dist/", "./");
            _contents = _contents.replaceAll("dist/", "");
            _contents = _contents
              .toString()
              .replaceAll(
                /"devDependencies": {([\S\s]+)}/gm,
                '"devDependencies": {}\n}'
              );
            _contents = _contents
              .toString()
              .replaceAll(/"scripts": {([\S\s]+)}/gm, '"scripts": {}\n}');
            return _contents;
          },
        },
        { src: "README.md", dest: "dist/", rename: "README.md" },
      ],
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "@fy-/components",
      formats: ["es", "cjs"],
      fileName: (format) => `fycomponents.${format}.js`,
    },
    rollupOptions: {
      external: [
        "vue",
        "@vue/compiler-dom",
        "@vueuse/core",
        "@fy-/head",
        "@fy-/core",
        "@fy-/icons",
        "@vuelidate/core",
        "@vuelidate/validators",
        "vue-router",
        "pinia",
        "@karpeleslab/klbfw",
      ],
      output: {
        exports: "named",
        sourcemap: true,
        dir: "./dist/",
        globals: {
          vue: "Vue",
          "@vue/compiler-dom": "VueCompilerDOM",
          "@vueuse/core": "vueuseCore",
          "@fy-/head": "fyHead",
          "@fy-/core": "fyCore",
          "@fy-/icons": "fyIcons",
          "@vuelidate/core": "vuelidateCore",
          "@vuelidate/validators": "vuelidateValidators",
          "vue-router": "vueRouter",
          pinia: "pinia",
          "@karpeleslab/klbfw": "klbfw",
        },
      },
    },
    emptyOutDir: false,
  },
};

export default config;

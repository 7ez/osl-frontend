"use client";

export default function Setup() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex-1 flex flex-col pt-6">
        <div className="flex flex-col text-center">
          <h1 className="text-4xl font-bold text-white">
            Welcome to osu! Server Launcher!
          </h1>
          <div className="pt-12" />
          <p className="text-xl">
            This is a tool that allows to manage osu! servers straight from your
            browser.
          </p>
          <p className="text-xl">
            Setup is pretty simple and requires you to follow these steps:.
          </p>
          <p className="text-xl">
            Download OSL Bridge (the app which launches your game/sets
            credentials) from{" "}
            <a
              href="https://github.com/7ez/osl-bridge/releases/latest/download/osl-bridge.exe"
              className="text-blue-400"
            >
              here
            </a>
            .
          </p>
          <p className="text-xl">
            Put the application in a safe path, which you won&apos;t delete by
            accident to ensure that it will always work. (ex.
            C:\Users\Aochi\osl)
          </p>
          <p className="text-xl">
            After that, run the application as administrator and follow the
            instructions.
            <br />
            Once completed, you can click{" "}
            <a href="/" className="text-blue-400">
              here
            </a>{" "}
            and start managing your osu! servers!
          </p>
        </div>
      </div>
    </main>
  );
}

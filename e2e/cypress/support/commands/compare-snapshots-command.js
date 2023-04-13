import e2e from '../../../config';

export default function compareSnapshotCommand() {
  Cypress.Commands.add('compareSnapshot', (name, options = {}) => {
    // get image title from the 'type' environment variable
    const title = Cypress.env('createBaseSnapshots') ? e2e.types.base : e2e.types.run;
    // take snapshot
    return cy
      .wait(450)
      .screenshot(`${name}-${title}`, { capture: 'viewport', ...options })
      .task('compareSnapshotsPlugin', {
        fileName: name,
        specDirectory: Cypress.spec.name,
        isEnabled: Cypress.env('runDiff'),
      }).then((diff) => {
        if (diff > 0) {
          throw new Error(`Pixel comparaison fail: ${diff}px diff for "${name}" snapshot`);
        }
      });
  });
}

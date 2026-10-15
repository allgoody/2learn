## Example 1 — A job that exists only in the interface

A build job was configured by hand in the web interface: three shell steps and an archived artifact. When a colleague asks to change the test command, nobody can say where the job's definition lives. Move the job into the repository as a pipeline file, leaving the server holding only credentials and agent configuration.

```text
job "api-build"
  agent: any
  steps:
    1. checkout the repository
    2. run ./run-tests.sh
    3. archive dist/*.tgz
```

### Solution

```text
// Jenkinsfile, in the repository beside the code it builds
pipeline {
  agent { label 'build' }
  stages {
    stage('Build and test') {
      steps {
        sh './run-tests.sh'
        archiveArtifacts artifacts: 'dist/*.tgz'
      }
    }
  }
}
```

The definition now lives where it is reviewed, versioned and restored with the code, so deleting the interface job and recreating it from this file produces the same behaviour. The steps did not change; the pipeline is simply a diff someone can read. The usual mistake is to move the steps into the file but leave the agent and the trigger chosen in the interface, which puts half the definition back inside the server's database.

## Example 2 — A deploy that runs wherever a build ran

A deploy stage runs on whichever agent picked up the build, including agents that cannot reach the internal artifact store, so the deploy fails intermittently and sometimes holds credentials it should never see. The pipeline below is what is used. Constrain the agents and say what each one is trusted with.

```text
pipeline {
  agent any
  stages {
    stage('Build')  { steps { sh './build.sh' } }
    stage('Deploy') { steps { sh './deploy.sh' } }
  }
}

agents: two in the cloud, one inside the internal network
```

### Solution

```text
pipeline {
  agent { label 'build' }        // cloud agents, no internal access
  stages {
    stage('Build') { steps { sh './build.sh' } }
    stage('Deploy') {
      agent { label 'internal' } // the only agent that reaches the store
      steps { sh './deploy.sh' }
    }
  }
}

build    holds build credentials only
internal holds the deploy credentials, and only this stage may use it
```

An agent's network position decides what its builds can reach, which is both the point of running the server and the reason to tie an agent to the code it builds. Pinning the deploy stage rather than the whole pipeline keeps the deploy credentials off the cloud agents. The usual mistake is `agent any`, which quietly shares every credential with every job on the server.
